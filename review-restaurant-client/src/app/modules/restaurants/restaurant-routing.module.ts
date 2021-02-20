import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListRestaurantComponent} from './list/list-restaurant.component';
import {CreateRestaurantComponent} from './create/create-restaurant.component';
import {ViewRestaurantComponent} from './view/view-restaurant.component';
import {UpdateRestaurantComponent} from './update/update-restaurant.component';
import {ReviewRestaurantComponent} from './review/create/review-restaurant.component';
import {UpdateReviewComponent} from "./review/update/update-review.component";


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
    path: ':id/review',
    component: ReviewRestaurantComponent
  },
  {
    path: ':id/update',
    component: UpdateRestaurantComponent
  }, {
    path: ':id/update/:reviewId',
    component: UpdateReviewComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule {
}
