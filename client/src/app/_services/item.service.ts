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
  isLoading = false

  constructor(private http: HttpClient) {}

  getItems() {
    console.log('call get function');

    return this.http.get<Item[]>(this.baseUrl + 'item').pipe(
      map((items) => {
        this.items = items;
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
