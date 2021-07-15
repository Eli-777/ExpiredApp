import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './view/homepage/homepage.component';
import { ItemsComponent } from './view/items/items.component';
import { ItemComponent } from './view/items/item/item.component';
import { LoginComponent } from './view/login/login.component';
import { RegisterComponent } from './view/register/register.component';
import { SettingComponent } from './view/setting/setting.component';
import { OptionsComponent } from './view/options/options.component';
import { OptionListsComponent } from './view/options/option-lists/option-lists.component';
import { NotFoundComponent } from './view/not-found/not-found.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomepageComponent,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
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
          { path: 'tag', component: OptionListsComponent },
          { path: 'location', component: OptionListsComponent },
        ],
      },
      { path: 'setting', component: SettingComponent },
    ],
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
