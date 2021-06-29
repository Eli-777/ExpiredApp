import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { take } from 'rxjs/operators';
import { ItemService } from './../../../_services/item.service';
import { Item } from './../../../interfaces/items';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  item!: Item;
  itemForm!: FormGroup;
  itemId = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private router: Router,
    private location: Location,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      itemName: [],
      manufacturingDate: [],
      expiryDay: [],
      guaranteePeriod: [],
      tag: [],
      location: [],
    });
    if (this.itemId) {
      this.item = this.itemService.items.find(
        (item) => item.id === +this.itemId!
      )!;

      this.item.manufacturingDate = (<Date> this.item.manufacturingDate).toISOString().split('T')[0]
      this.item.expiryDay = (<Date> this.item.expiryDay).toISOString().split('T')[0]

      this.itemForm.setValue({
        itemName: this.item.itemName,
        manufacturingDate: this.item.manufacturingDate,
        expiryDay: this.item.expiryDay,
        guaranteePeriod: this.item.guaranteePeriod,
        tag: this.item.tag,
        location: this.item.location,
      });
    }
  }

  addItem() {
    this.itemService
      .addItem(this.itemForm.value)
      .pipe(take(1))
      .subscribe(() => this.location.back());
  }

  editItem() {
    const editedItem = { ...this.item, ...this.itemForm.value };
    this.itemService
      .editItem(+this.itemId!, editedItem)
      .pipe(take(1))
      .subscribe(() => this.location.back());
  }

  notChange() {
    this.itemForm.reset(this.item);
    this.location.back()
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
}
