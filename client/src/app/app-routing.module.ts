import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './view/homepage/homepage.component';
import { ItemsComponent } from './view/items/items.component';
import { ItemComponent } from './view/items/item/item.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
