import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListRestaurantComponent} from './list/list-restaurant.component';
import {CreateRestaurantComponent} from './create/create-restaurant.component';
import {ViewRestaurantComponent} from './view/view-restaurant.component';
import {UpdateRestaurantComponent} from './update/update-restaurant.component';
import {ReviewRestaurantComponent} from './review/create/review-restaurant.component';
import {UpdateReviewComponent} from './review/update/update-review.component';
import {AuthGuard} from '../account/auth.guard';
import {Roles} from '../../models/roles';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ListRestaurantComponent,
  },
  {
    path: 'create',
    component: CreateRestaurantComponent,
    // owner can create restaurants
    data: {roles: [Roles.OWNER]},
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: ViewRestaurantComponent,
  },
  {
    path: ':id/review',
    component: ReviewRestaurantComponent,
    // regular user can create reviews on restaurants
    data: {roles: [Roles.CUSTOMER]},
    canActivate: [AuthGuard]
  },
  {
    path: ':id/update',
    component: UpdateRestaurantComponent,
    // only admin can update a restaurant
    data: [Roles.ADMIN],
    canActivate: [AuthGuard],
  }, {
    path: ':id/update/:reviewId',
    component: UpdateReviewComponent,
    // only admin can update a review
    data: {roles: [Roles.ADMIN]},
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule {
}
