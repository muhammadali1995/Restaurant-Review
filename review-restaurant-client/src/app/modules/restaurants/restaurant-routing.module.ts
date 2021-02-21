import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListRestaurantComponent} from './list/list-restaurant.component';
import {CreateRestaurantComponent} from './create/create-restaurant.component';
import {ViewRestaurantComponent} from './view/view-restaurant.component';
import {UpdateRestaurantComponent} from './update/update-restaurant.component';
import {ReviewRestaurantComponent} from './review/create/review-restaurant.component';
import {UpdateReviewComponent} from './review/update/update-review.component';
import {Roles} from '../../models/roles';
import {AuthGuard} from '../account/auth.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ListRestaurantComponent,
  },
  {
    path: 'create',
    component: CreateRestaurantComponent,
    data: [Roles.OWNER],
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: ViewRestaurantComponent
  },
  {
    path: ':id/review',
    component: ReviewRestaurantComponent,
    data: [Roles.REGULAR_USER],
    canActivate: [AuthGuard],
  },
  {
    path: ':id/update',
    component: UpdateRestaurantComponent,
    data: [Roles.ADMIN],
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  }, {
    path: ':id/update/:reviewId',
    component: UpdateReviewComponent,
    data: [Roles.ADMIN],
    canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule {
}
