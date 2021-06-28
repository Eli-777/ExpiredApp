import { ItemsComponent } from './view/items/items.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './view/homepage/homepage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'expiring', component: ItemsComponent },
  { path: 'expired', component: ItemsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
