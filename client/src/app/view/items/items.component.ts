import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { ItemService } from './../../_services/item.service';
import { ItemParams } from 'src/app/interfaces/itemParams';
import { Item } from 'src/app/interfaces/items';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  itemsSub!: Subscription;
  page: string = ''

  constructor(public itemService: ItemService, private route: ActivatedRoute) {}


  ngOnInit(): void {

    this.page = this.route.snapshot.url[0].path

    if (this.page === 'expiring' && !this.itemService.expiringItems$.value.length) {
      this.getData(new ItemParams(50, false));
    } else if (this.page === 'expired' && !this.itemService.expiredItems$.value.length) {
      this.getData(new ItemParams(-1, true));
    } else if (this.page === 'items' && !this.itemService.items$.value.length){
      this.getData(new ItemParams());
    } else {
      this.getCacheData()
    }
  }


  getData(itemParams: ItemParams) {
    this.itemService.isLoading = true;
    this.itemService
      .getItems(itemParams)
      .pipe(take(1))
      .subscribe(() => {
        this.itemService.isLoading = false;
        this.getCacheData()
      });
  }

  getCacheData() {
    if(this.page === 'expiring' ) {
      this.itemsSub = this.itemService.expiringItems$.subscribe(items => {
        this.items = items
      })
    } else if (this.page === 'expired' ) {
      this.itemsSub = this.itemService.expiredItems$.subscribe(items => {
        this.items = items
      })
    } else if (this.page === 'items' ) {
      this.itemsSub = this.itemService.items$.subscribe(items => {
        this.items = items
      })
    }
  }

  ngOnDestroy(): void {
    this.itemsSub.unsubscribe();
  }
}
