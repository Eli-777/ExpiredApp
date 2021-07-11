import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AccountService } from './_services/account.service';
import { SettingService } from './_services/setting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isGetSettingData = true;

  constructor(
    public accountService: AccountService,
    private settingService: SettingService
  ){}

  ngOnInit(): void {
    const localStorageUser = localStorage.getItem('user');
    if (localStorageUser) {
      this.isGetSettingData = false
      this.accountService.currentUser.next(JSON.parse(localStorageUser));
      this.settingService
        .getSettingData()
        .pipe(take(1))
        .subscribe(() => {
          this.settingService.setColorTheme(            
            this.settingService.settingCache.isDarkMode
          );
          this.isGetSettingData = true
        });
    
  }
}
}
