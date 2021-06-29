import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/items';
import { ItemService } from './../../_services/item.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  constructor(public itemService: ItemService) {}

  ngOnInit(): void {
    if (!this.itemService.items.length) {
      this.itemService.isLoading = true;
      this.itemService
        .getItems()
        .pipe(take(1))
        .subscribe(() => (this.itemService.isLoading = false));
    }
  }
}
