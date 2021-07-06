import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { take, tap } from 'rxjs/operators';
import { ItemService } from './../../../_services/item.service';
import { Item } from './../../../interfaces/items';
import * as moment from 'moment';
import { ItemOption } from 'src/app/interfaces/itemOption';
import { Observable } from 'rxjs';
import { OptionService } from 'src/app/_services/option.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  item?: Item;
  itemForm!: FormGroup;
  itemId = this.route.snapshot.paramMap.get('id');
  tagOptions$!: Observable<ItemOption[]>;
  locationOptions$!: Observable<ItemOption[]>;
  tags: ItemOption[] = [];
  locations: ItemOption[] = [];

  manufacturingDate: any = null;
  expiryDate: any = null;
  guaranteePeriod: any = null;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private optionService: OptionService,
    private router: Router,
    private location: Location,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      itemName: [null, Validators.required],
      manufacturingDate: [],
      expiryDate: [],
      guaranteePeriod: [null, Validators.required],
      tag: [null, Validators.required],
      location: [null, Validators.required],
      photoFile: [],
    });
    this.getItem();
    this.tagOptions$ = this.optionService
      .getOptions('tag')
      .pipe(tap((tags: ItemOption[]) => (this.tags = tags)));
    this.locationOptions$ = this.optionService
      .getOptions('location')
      .pipe(tap((locations: ItemOption[]) => (this.locations = locations)));

    this.listeningDateChange();
  }

  getItem() {
    if (this.itemId) {
      this.itemService.getItem(+this.itemId).subscribe(() => {
        this.item = this.itemService.item;

        if (this.item) {
          const formValue = this.changeItemFormValueToInput();
          this.itemForm.reset(formValue);
        }
      });
    }
  }

  addItem() {
    const inputRawValue = this.itemForm.getRawValue();

    this.itemService
      .addItem(inputRawValue)
      .pipe(take(1))
      .subscribe(() => this.router.navigate(['/items']));
  }

  editItem() {
    const inputRawValue = this.itemForm.getRawValue();
    const newTagSelect = this.tags.find(
      (tag) => tag.id === this.itemForm.value.tag
    );
    const newLocationSelect = this.locations.find(
      (location) => location.id === this.itemForm.value.location
    );

    const editedItem = { ...this.item, ...inputRawValue };
    editedItem.tag = newTagSelect;
    editedItem.location = newLocationSelect;

    this.itemService
      .editItem(+this.itemId!, editedItem)
      .pipe(take(1))
      .subscribe(() => this.location.back());
  }

  notChange() {
    const formValue = this.changeItemFormValueToInput();
    this.itemForm.reset(formValue);
    this.location.back();
  }

  deleteItem() {
    if (this.itemId) {
      this.itemService
        .deleteItem(+this.itemId)
        .pipe(take(1))
        .subscribe(() => {
          this.location.back();
        });
    }
  }

  expiryMinDate() {
    return moment(new Date(this.itemForm.value.manufacturingDate));
  }

  changeItemFormValueToInput() {
    if (this.item) {
      const formValue: any = {};
      Object.assign(formValue, this.item);
      formValue.tag = this.item.tag.id;
      formValue.location = this.item.location?.id;
      return formValue;
    }
  }

  listeningDateChange() {
    this.itemForm.controls.manufacturingDate.valueChanges.subscribe((val) => {
      this.manufacturingDate = val;
      this.onCheckDate();
    });

    this.itemForm.controls.expiryDate.valueChanges.subscribe((val) => {
      this.expiryDate = val;
      this.onCheckDate();
    });
    this.itemForm.controls.guaranteePeriod.valueChanges.subscribe((val) => {
      this.guaranteePeriod = val;
      if (!this.itemId) return this.onCheckDate();
    });
  }

  onCheckDate() {
    if (!this.itemId) {
      if (this.manufacturingDate && this.guaranteePeriod) {
        const expiryDate =
          this.manufacturingDate + this.guaranteePeriod * 24 * 60 * 60 * 1000;

        this.itemForm.controls.expiryDate.setValue(new Date(expiryDate), {
          emitEvent: false,
        });
        this.itemForm.controls.expiryDate.disable({ emitEvent: false });
      }
      if (this.guaranteePeriod && this.expiryDate) {
        const manufacturingDate =
          this.expiryDate - this.guaranteePeriod * 24 * 60 * 60 * 1000;

        this.itemForm.controls.manufacturingDate.setValue(
          new Date(manufacturingDate),
          {
            emitEvent: false,
          }
        );
        this.itemForm.controls.manufacturingDate.disable({ emitEvent: false });
      }
      if (this.manufacturingDate && this.expiryDate) {
        const guaranteePeriodMillisecond =
          this.expiryDate - this.manufacturingDate;
        const days = guaranteePeriodMillisecond / 1000 / 60 / 60 / 24;
        this.itemForm.patchValue(
          { guaranteePeriod: days },
          { emitEvent: false }
        );
        this.itemForm.controls.guaranteePeriod.disable({ emitEvent: false });
      }
    } else {
      this.itemForm.controls.guaranteePeriod.disable({ emitEvent: false });
      const exD: any = new Date(this.expiryDate);
      const mfD: any = new Date(this.manufacturingDate);
      const guaranteePeriodMillisecond = exD - mfD;
      const days = Math.round(guaranteePeriodMillisecond / 1000 / 60 / 60 / 24);

      this.itemForm.patchValue({ guaranteePeriod: days }, { emitEvent: false });
    }
  }

  onFileChanged(event: any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        this.itemForm.patchValue({
          photoFile:  e.target!.result
        }, { emitEvent: false });

      };
    }
  }
}
