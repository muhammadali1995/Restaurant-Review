import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListRestaurantComponent} from './list/list-restaurant.component';
import {CreateRestaurantComponent} from './create/create-restaurant.component';
import {ViewRestaurantComponent} from './view/view-restaurant.component';
import {UpdateRestaurantComponent} from './update/update-restaurant.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ListRestaurantComponent,
  },
  {
    path: 'create',
    component: CreateRestaurantComponent
  },
  {
    path: ':id',
    component: ViewRestaurantComponent
  },
  {
    path: ':id/update',
    component: UpdateRestaurantComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule {
}
