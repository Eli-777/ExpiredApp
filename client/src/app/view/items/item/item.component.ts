import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { take } from 'rxjs/operators';
import { ItemService } from './../../../_services/item.service';
import { Item } from './../../../interfaces/items';
import * as moment from 'moment';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  item?: Item;
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
      itemName: [null, Validators.required],
      manufacturingDate: [],
      expiryDate: [],
      guaranteePeriod: [],
      tag: [],
      location: [],
    });
    this.getItem();
  }


  getItem() {
    if (this.itemId) {
      this.itemService.getItem(+this.itemId).subscribe(() => {
        this.item = this.itemService.item;
        if (this.item) {
          this.itemForm.reset(this.item);
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
    this.itemForm.reset(this.item);
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
}
