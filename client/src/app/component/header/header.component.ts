import { User } from './../../interfaces/user';
import { AccountService } from './../../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isClick = false;

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    const localStorageUser = localStorage.getItem("user")
    if (localStorageUser) {
      this.accountService.currentUser.next(JSON.parse(localStorageUser))
    }
  }

  openNav(isLogout=false) {
    this.isClick = !this.isClick
    if (isLogout) {
      this.logout()
    }
  }

  logout() {
    this.accountService.logout()
  }

}
