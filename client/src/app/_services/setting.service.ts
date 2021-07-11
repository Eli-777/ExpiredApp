import { ItemService } from './item.service';
import { Setting } from './../interfaces/setting';
import { tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  baseUrl = environment.apiUrl;
  settingCache: Setting = new Setting();
  isLoading: boolean = false;

  constructor(private http: HttpClient, private itemService: ItemService) {}

  getSettingData() {
    this.isLoading = true;
    return this.http.get<Setting>(this.baseUrl + 'setting').pipe(
      tap((setting) => {
        this.settingCache = { ...setting };
        this.isLoading = false;
      })
    );
  }

  updateSetting(setting: Setting) {
    this.isLoading = true;
    return this.http.put(this.baseUrl + 'setting', setting).pipe(
      tap(() => {
        if (setting.fromExpiredDay !== this.settingCache.fromExpiredDay) {
          this.itemService.clearAllItems();
        }
      })
    );
  }

  setColorTheme(isDarkMode: boolean) {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }
}
