import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap, concatMap } from 'rxjs/operators';
import { SettingService } from 'src/app/_services/setting.service';
import { ItemService } from 'src/app/_services/item.service';
import { ItemParams } from 'src/app/interfaces/itemParams';
import { OptionService } from './../../_services/option.service';
import { Item } from './../../interfaces/items';


interface HorizontalBarData {
  seriesNotExpiredData: number[],
  seriesExpiringData: number[],
  seriesExpiredData: number[],
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  isLoaded: boolean = false;
  fromExpiredDay: number = 50;
  items: Item[] = [];
  itemsSub!: Subscription;
  tags: string[] = [];
  //pie
  pieData: object[] = [];

  //gauge
  gaugeDataExpirationRate = {
    value: 0,
    name: '過期率',
  };
  gaugeTitleExpirationRate = {
    text: '總過期比率',
    subtext: '過期數量 / 總數量',
    left: 'center',
  };

  gaugeDataSpotRate = {
    value: 0,
    name: '即期率',
  };

  //stacked-horizontal-bar
  yAxis: string[] = [];
  horizontalBarData :HorizontalBarData = {
    seriesNotExpiredData: [],
    seriesExpiringData: [],
    seriesExpiredData: [],
  };

  constructor(
    private itemService: ItemService,
    private settingService: SettingService,
    private optionService: OptionService
  ) {}

  ngOnInit(): void {
    this.getItemData();
  }

  getItemData() {
    this.itemService
      .getItems(new ItemParams())
      .pipe(
        tap((items) => {
          this.items = items;
        }),
        concatMap(() => {
          return this.settingService.getSettingData().pipe(
            tap((setting) => {
              this.fromExpiredDay = setting.fromExpiredDay;
            })
          );
        }),
        concatMap(() => {
          return this.optionService.getOptions('tag').pipe(
            tap((tags) => {
              tags.map((tag) => {
                this.tags.push(tag.name);
              });
            })
          );
        })
      )
      .subscribe(() => {
        this.pieData = this.getPieData();
        this.gaugeDataExpirationRate = this.getExpirationRate();
        this.gaugeDataSpotRate = this.getSpotRate();
        this.yAxis = this.tags;
        this.horizontalBarData =  this.getStackedHorizontalBarData();
        this.isLoaded = true;
      });
  }

  getPieData() {
    const data: object[] = [];
    this.tags.map((tag) => {
      const tagValue = this.items.filter((item) => {
        return item.tag.name === tag;
      }).length;

      data.push({
        value: tagValue,
        name: tag,
      });
    });

    return data;
  }

  getExpirationRate() {
    const totalItemQ = this.items.length;
    const today = Date.now();
    const expiredQ = this.items.filter((item) => {
      return new Date(item.expiryDate!).getTime() < today;
    }).length;
    const expirationRate = +((expiredQ / totalItemQ) * 100).toFixed(2);

    const gaugeDataExpirationRate = {
      value: expirationRate,
      name: '過期率',
    };
    return gaugeDataExpirationRate;
  }

  getSpotRate() {
    const totalItemQ = this.items.length;
    const today = Date.now();
    const maxDate = today + this.fromExpiredDay * 1000 * 60 * 60 * 24;
    const expiredQ = this.items.filter((item) => {
      const itemExpiryDate = new Date(item.expiryDate!).getTime();
      return itemExpiryDate > today && itemExpiryDate < maxDate;
    }).length;
    const dataSpotRate = +((expiredQ / totalItemQ) * 100).toFixed(2);

    const gaugeDataDataSpotRate = {
      value: dataSpotRate,
      name: '即期率',
    };
    return gaugeDataDataSpotRate;
  }

  getStackedHorizontalBarData() {
    const seriesNotExpiredData: number[] = [];
    const seriesExpiringData: number[] = [];
    const seriesExpiredData: number[] = [];

    this.tags.map((tag) => {
      const tagItems = this.items.filter((items) => {
        return items.tag.name === tag;
      });

      const notExpiredItems = [];
      const expiringItems = [];
      const expiredItems = [];
      tagItems.map((tagItem) => {
        const today = Date.now();
        const maxDate = today + this.fromExpiredDay * 1000 * 60 * 60 * 24;
        const itemExpiryDate = new Date(tagItem.expiryDate!).getTime();

        if (itemExpiryDate < today) {
          expiredItems.push(tagItem);
        } else if (itemExpiryDate > today && itemExpiryDate < maxDate) {
          expiringItems.push(tagItem);
        } else {
          notExpiredItems.push(tagItem);
        }
      });

      seriesNotExpiredData.push(notExpiredItems.length);
      seriesExpiringData.push(expiringItems.length);
      seriesExpiredData.push(expiredItems.length);
    });

    return {
      seriesNotExpiredData,
      seriesExpiringData,
      seriesExpiredData,
    };
  }
}
