import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RestaurantRoutingModule} from './restaurant-routing.module';
import {CreateRestaurantComponent} from './create/create-restaurant.component';
import {ListRestaurantComponent} from './list/list-restaurant.component';
import {SharedModule} from '../shared/shared.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {ViewRestaurantComponent} from './view/view-restaurant.component';
import {UpdateRestaurantComponent} from './update/update-restaurant.component';
import {DeleteRestaurantComponent} from './delete/delete-restaurant.component';
import {ReviewRestaurantComponent} from './review/review-restaurant.component';
import {CommentRestaurantComponent} from './comment/comment-restaurant.component';


@NgModule({
  declarations: [CreateRestaurantComponent,
    ListRestaurantComponent,
    ViewRestaurantComponent,
    UpdateRestaurantComponent,
    DeleteRestaurantComponent,
    ReviewRestaurantComponent,
    CommentRestaurantComponent],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    FormsModule,
    NgbModule,
  ]
})
export class RestaurantModule {
}
