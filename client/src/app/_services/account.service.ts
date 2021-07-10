import { ItemService } from './item.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Account } from './../interfaces/account';
import { User } from '../interfaces/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl: string = environment.apiUrl;
  currentUser = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUser.asObservable()

  constructor(private http: HttpClient, private itemService: ItemService) {}

  login(accountParam: Account) {
    return this.http
      .post<User>(this.baseUrl + 'account/login', accountParam)
      .pipe(
        tap((user: User) => {
          if (user) {
            this.currentUser.next(user);
            localStorage.setItem('user', JSON.stringify(user));
          }
        })
      );
  }

  register(accountParam: Account) {
    return this.http
      .post<User>(this.baseUrl + 'account/register', accountParam)
      .pipe(
        tap((user: User) => {
          if (user) {
            this.currentUser.next(user);
            localStorage.setItem('user', JSON.stringify(user));
          }
        })
      );
  }

  logout() {
    this.currentUser.next(undefined)
    localStorage.removeItem('user')
    this.itemService.clearAllItems()
  }


}
