import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ItemOption } from '../interfaces/itemOption';

@Injectable({
  providedIn: 'root',
})
export class OptionService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getOptions(option: string) {
    return this.http.get<ItemOption[]>(this.baseUrl + option).pipe(
      map((options: ItemOption[]) => {
        return options.sort((a: any,b: any) =>  b.id - a.id)
      })
    );
  }

  addOption(option: string, tag: ItemOption) {
    return this.http.post(this.baseUrl + option, tag);
  }

  deleteOption(option: string, id: number) {
    return this.http.delete(this.baseUrl + option + '/' + id);
  }

  updateOption(option: string, tag: ItemOption) {
    return this.http.put(this.baseUrl + option + '/' + tag.id, tag);
  }
}
