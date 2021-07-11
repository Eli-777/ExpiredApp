import { SettingService } from 'src/app/_services/setting.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Item } from '../interfaces/items';
import { ItemParams } from './../interfaces/itemParams';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  baseUrl = environment.apiUrl;
  items$ = new BehaviorSubject<Item[]>([]);
  expiringItems$ = new BehaviorSubject<Item[]>([]);
  expiredItems$ = new BehaviorSubject<Item[]>([]);
  item?: Item;
  isLoading = false;

  constructor(private http: HttpClient) { }

  getItems(itemParams: ItemParams) {
    let params = new HttpParams();
    params = params.append('fromExpiredDay', itemParams.fromExpiredDay!);
    params = params.append('isExpired', itemParams.isExpired!);

    return this.http.get<Item[]>(this.baseUrl + 'item', { params }).pipe(
      map((items) => {
        if (itemParams.fromExpiredDay > 0) {
          this.expiringItems$.next(items);
        } else if (itemParams.isExpired) {
          this.expiredItems$.next(items);
        } else {
          this.items$.next(items);
        }
      })
    );
  }

  getItem(id: number) {
    return this.http.get<Item>(this.baseUrl + 'item/' + id).pipe(
      map((item) => {
        this.item = item;
      })
    );
  }

  addItem(item: Item, fromExpiredDay: number) {
    return this.http.post<Item>(this.baseUrl + 'item', item).pipe(
      map((newItem) => {
        if (this.items$.value.length) {
          this.items$.pipe(take(1)).subscribe((items) => {
            this.items$.next([...items, newItem]);
          });
        }

        const today: any = new Date();
        const newItemExpiryDate = new Date(newItem.expiryDate!);

        if (
          newItem.expiryDate &&
          newItemExpiryDate < today &&
          this.expiredItems$.value.length
        ) {
          this.expiredItems$.pipe(take(1)).subscribe((expiredItems) => {
            this.expiredItems$.next([...expiredItems, newItem]);
          });
        }

        let maxDate = new Date();
        maxDate.setTime(
          maxDate.setDate(maxDate.getDate() + fromExpiredDay)
        );

        if (
          newItemExpiryDate &&
          newItemExpiryDate > today &&
          newItemExpiryDate < maxDate &&
          this.expiringItems$.value.length
        ) {
          this.expiringItems$.pipe(take(1)).subscribe((expiringItems) => {
            this.expiringItems$.next([...expiringItems, newItem]);
          });
        }
      })
    );
  }

  editItem(id: number, item: Item, fromExpiredDay: number) {
    return this.http.put(this.baseUrl + 'item/' + id, item).pipe(
      map(() => {
        this.items$.pipe(take(1)).subscribe((items) => {
          const editedItems = this.findAndEditOldItem(items, item, id);
          this.items$.next(editedItems);
        });
        this.expiredItems$.pipe(take(1)).subscribe((items) => {
          const editedItems = this.findAndEditOldItem(
            items,
            item,
            id,
            false,
            fromExpiredDay,
            true
          );
          this.expiredItems$.next(editedItems);
        });
        this.expiringItems$.pipe(take(1)).subscribe((items) => {
          const editedItems = this.findAndEditOldItem(items, item, id, true, fromExpiredDay);
          this.expiringItems$.next(editedItems);
        });
      })
    );
  }

  findAndEditOldItem(
    items: Item[],
    item: Item,
    id: number,
    isExpiring: boolean = false,
    fromExpiredDay: number = 50,
    isExpired: boolean = false
  ) {
    const index = items.findIndex((findItem) => findItem.id === id);
    const oldItem = items[index];

    const newItemExpiryDate = new Date(item.expiryDate!);
    const today: any = new Date();
    let maxDate = new Date();
    maxDate.setTime(maxDate.setDate(maxDate.getDate() + fromExpiredDay));

    if (
      isExpired &&
      newItemExpiryDate > today &&
      newItemExpiryDate < maxDate &&
      oldItem
    ) {
      return (items = items.filter((item) => item.id !== oldItem.id));
    } else if (
      isExpired &&
      newItemExpiryDate < today &&
      this.expiredItems$.value.length &&
      !oldItem
    ) {
      const editedItem = { ...item };
      items.push(editedItem);
      return items;
    }

     if (
      isExpiring &&
      (newItemExpiryDate > maxDate || newItemExpiryDate < today) &&
      oldItem
    ) {
      return (items = items.filter((item) => item.id !== oldItem.id));
    } else if (
      isExpiring &&
      newItemExpiryDate > today &&
      this.expiringItems$.value.length &&
      !oldItem
    ) {
      const editedItem = { ...item };
      items.push(editedItem);
      return items;
    }

    if (index >= 0) {
      items[index] = { ...oldItem, ...item };
    }
    return items;
  }

  deleteItem(id: number) {
    return this.http.delete(this.baseUrl + 'item/' + id).pipe(
      map(() => {
        this.items$.pipe(take(1)).subscribe((items) => {
          const deletedItems = items.filter((item) => item.id !== id);
          this.items$.next(deletedItems);
        });

        this.expiredItems$.pipe(take(1)).subscribe((items) => {
          const deletedItems = items.filter((item) => item.id !== id);
          this.expiredItems$.next(deletedItems);
        });

        this.expiringItems$.pipe(take(1)).subscribe((items) => {
          const deletedItems = items.filter((item) => item.id !== id);
          this.expiringItems$.next(deletedItems);
        });
        this.isLoading = false;
      })
    );
  }

  clearAllItems() {
    this.items$.next([]);
    this.expiredItems$.next([]);
    this.expiringItems$.next([]);
  }
}
