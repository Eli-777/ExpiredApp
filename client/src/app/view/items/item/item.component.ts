import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { take } from 'rxjs/operators';
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
      guaranteePeriod: [],
      tag: [null, Validators.required],
      location: [],
    });
    this.getItem();
    this.tagOptions$ = this.optionService.getOptions('tag');
    this.locationOptions$ = this.optionService.getOptions('location');
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
    this.itemService
      .addItem(this.itemForm.value)
      .pipe(take(1))
      .subscribe(() => this.router.navigate(['/items']));
  }

  editItem() {
    const editedItem = { ...this.item, ...this.itemForm.value };
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
      formValue.tag = this.item.tag.name;
      formValue.location = this.item.location.name;
      return formValue;
    }
  }

}
