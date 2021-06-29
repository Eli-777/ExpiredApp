import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Item } from '../interfaces/items';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  baseUrl = environment.apiUrl;
  items: Item[] = [];
  isLoading = false;

  constructor(private http: HttpClient) {}

  getItems() {
    return this.http.get<Item[]>(this.baseUrl + 'item').pipe(
      map((items) => {
        items.forEach((item) => {
          if (item.manufacturingDate || item.expiryDay) {
            item.manufacturingDate = new Date(item.manufacturingDate!);
            item.expiryDay = new Date(item.expiryDay!);
          }
        });
        this.items = items;
      })
    );
  }

  addItem(item: Item) {
    return this.http.post(this.baseUrl + 'item', item).pipe(
      map((response) => {
        console.log('after post = ', response);

        this.items.push(item);
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
