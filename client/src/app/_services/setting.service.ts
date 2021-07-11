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

  constructor(private http: HttpClient) {}

  getSettingData() {
    return this.http.get<Setting>(this.baseUrl + 'setting').pipe(
      tap((setting) => {
        this.settingCache = { ...setting };
      })
    );
  }

  updateSetting(setting: Setting) {
    return this.http.put(this.baseUrl + 'setting', setting);
  }
}
