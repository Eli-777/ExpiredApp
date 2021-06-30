import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Item } from '../interfaces/items';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  baseUrl = environment.apiUrl;
  items: Item[] = [];
  item?: Item;
  isLoading = false;

  constructor(private http: HttpClient) {}

  getItems() {
    return this.http.get<Item[]>(this.baseUrl + 'item').pipe(
      map((items) => {
        this.items = items;
      })
    );
  }

  getItem(id: number) {
    return this.http.get<Item>(this.baseUrl + 'item/' + id).pipe(
      map(item => {
        this.item = item
      })
    )
  }

  addItem(item: Item) {
    return this.http.post<Item>(this.baseUrl + 'item', item).pipe(
      map((newItem) => {
        this.items.push(newItem);
      })
    );
  }

  editItem(id: number, item: Item) {
    return this.http.put(this.baseUrl + 'item/' + id, item).pipe(
      map(() => {
        const index = this.items.findIndex((findItem) => findItem.id === id);
        const oldItem = this.items[index];
        this.items[index] = { ...oldItem, ...item };
      })
    );
  }

  deleteItem(id: number) {
    return this.http.delete(this.baseUrl + 'item/' + id).pipe(
      map(() => {
        this.items = this.items.filter((item) => item.id !== id);
      })
    );
  }
}
