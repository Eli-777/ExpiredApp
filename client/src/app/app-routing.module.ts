import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './view/homepage/homepage.component';
import { ItemsComponent } from './view/items/items.component';
import { ItemComponent } from './view/items/item/item.component';
import { LoginComponent } from './view/login/login.component';
import { RegisterComponent } from './view/register/register.component';
import { SettingComponent } from './view/setting/setting.component';
import { OptionsComponent } from './view/options/options.component';
import { OptionTableComponent } from './view/options/option-table/option-table.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  {
    path: 'items',
    component: ItemsComponent,
  },
  {
    path: 'items/add',
    component: ItemComponent,
  },
  {
    path: 'items/:id',
    component: ItemComponent,
  },
  { path: 'expiring', component: ItemsComponent },
  { path: 'expired', component: ItemsComponent },
  {
    path: 'options',
    component: OptionsComponent,
    children: [
      { path: 'tags', component: OptionTableComponent },
      { path: 'positions', component: OptionTableComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'setting', component: SettingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
