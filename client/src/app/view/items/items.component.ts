import { SettingService } from 'src/app/_services/setting.service';
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
  pageTitle: string = '所有物品'

  constructor(
    public itemService: ItemService, 
    private route: ActivatedRoute, 
    private settingService: SettingService
  ) {}


  ngOnInit(): void {

    this.page = this.route.snapshot.url[0].path
    if (this.page === 'expiring')  this.pageTitle = "即將到期"
    if (this.page === 'expired')  this.pageTitle = "已過期"

    if (this.page === 'expiring' && !this.itemService.expiringItems$.value.length) {  
      const fromExpiredDay = this.settingService.settingCache.fromExpiredDay
      this.getData(new ItemParams(fromExpiredDay, false));
     
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
