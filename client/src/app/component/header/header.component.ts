import { take } from 'rxjs/operators';
import { SettingService } from './../../_services/setting.service';
import { AccountService } from './../../_services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isClick = false;

  constructor(
    public accountService: AccountService,
    private settingService: SettingService
  ) {}

  ngOnInit(): void {
    const localStorageUser = localStorage.getItem('user');
    if (localStorageUser) {
      this.accountService.currentUser.next(JSON.parse(localStorageUser));
      this.settingService
        .getSettingData()
        .pipe(take(1))
        .subscribe(() => {
          this.settingService.setColorTheme(
            this.settingService.settingCache.isDarkMode
          );
        });
    }
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
