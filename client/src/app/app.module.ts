import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { HomepageComponent } from './view/homepage/homepage.component';
import { ItemsComponent } from './view/items/items.component';
import { CardComponent } from './component/card/card.component';
import { ButtonComponent } from './component/button/button.component';
import { ItemComponent } from './view/items/item/item.component';
import { LoginComponent } from './view/login/login.component';
import { RegisterComponent } from './view/register/register.component';
import { SettingComponent } from './view/setting/setting.component';
import { OptionsComponent } from './view/options/options.component';
import { OptionListsComponent } from './view/options/option-lists/option-lists.component';
import { OptionListComponent } from './view/options/option-list/option-list.component';

export const TW_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'YYYY MMM',
    dateA11yLabel: 'YYYY/MM/DD',
    monthYearA11yLabel: 'YYYY MMM',
  },
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    ItemsComponent,
    CardComponent,
    ButtonComponent,
    ItemComponent,
    LoginComponent,
    RegisterComponent,
    SettingComponent,
    OptionsComponent,
    OptionListsComponent,
    OptionListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'zh-TW' },
    { provide: MAT_DATE_FORMATS, useValue: TW_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
