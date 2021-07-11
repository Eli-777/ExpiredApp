import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { SettingService } from './../../_services/setting.service';
import { Setting } from './../../interfaces/setting';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  settingOption: Setting = new Setting();

  constructor(private settingService: SettingService) {}

  ngOnInit(): void {
    this.settingService
      .getSettingData()
      .pipe(take(1))
      .subscribe((setting) => {
        console.log(setting);

        this.settingOption = { ...setting };
      });
  }

  onSubmit() {
    this.settingService
      .updateSetting(this.settingOption)
      .pipe(take(1))
      .subscribe(
        () => (this.settingService.settingCache = { ...this.settingOption })
      );
  }

  onCancel() {
    this.settingOption = { ...this.settingService.settingCache };
  }

  darkModeToggle() {
    console.log(this.settingOption);
    if(this.settingOption.isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark")
    } else {
      document.documentElement.setAttribute("data-theme", "light")
    }
  }
}
