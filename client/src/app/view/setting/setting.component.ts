import { Component, OnInit, OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators';
import { SettingService } from './../../_services/setting.service';
import { Setting } from './../../interfaces/setting';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit, OnDestroy {
  settingOption: Setting = new Setting();

  constructor(public settingService: SettingService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.settingService
      .getSettingData()
      .pipe(take(1))
      .subscribe((setting) => {
        this.settingOption = { ...setting };
        this.darkModeToggle();
      });
  }

  onSubmit() {
    if (!this.settingService.isLoading) {
      this.settingService
        .updateSetting(this.settingOption)
        .pipe(take(1))
        .subscribe(() => {
          this.settingService.settingCache = { ...this.settingOption };
          this.settingService.isLoading = false;
          this.toastr.success('設定成功')
        });
    }
  }

  onCancel() {
    this.settingOption = { ...this.settingService.settingCache };
    this.darkModeToggle();
  }

  darkModeToggle() {
    this.settingService.setColorTheme(this.settingOption.isDarkMode);
  }

  ngOnDestroy(): void {
    this.onCancel();
  }
}
