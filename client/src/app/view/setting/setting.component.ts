import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  settingOption: any = {}

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.settingOption);

  }

  darkModeToggle() {
    console.log(this.settingOption);

  }

}
