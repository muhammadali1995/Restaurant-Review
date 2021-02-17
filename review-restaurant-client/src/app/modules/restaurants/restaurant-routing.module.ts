import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListRestaurantComponent} from './list/list-restaurant.component';
import {CreateRestaurantComponent} from './create/create-restaurant.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ListRestaurantComponent,
  },
  {
    path: 'create',
    component: CreateRestaurantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule {
}
