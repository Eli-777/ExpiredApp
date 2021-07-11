import { Component, OnInit } from '@angular/core';
import { AccountService } from './../../_services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isClick = false;

  constructor(
    public accountService: AccountService
  ) {}

  ngOnInit(): void {
  }

  openNav(isLogout = false) {
    this.isClick = !this.isClick;
    if (isLogout) {
      this.logout();
    }
  }

  logout() {
    this.accountService.logout();
  }
}
