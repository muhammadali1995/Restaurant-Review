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
import {ReviewRestaurantComponent} from './review/create/review-restaurant.component';
import {CommentRestaurantComponent} from './comment/create/comment-restaurant.component';
import {ListReviewComponent} from './review/list/list-review.component';
import {ListCommentComponent} from './comment/list/list-comment.component';
import {DeleteReviewComponent} from './review/delete/delete-review.component';
import {UpdateCommentComponent} from './comment/update/update-comment.component';
import {DeleteCommentComponent} from './comment/delete/delete-comment.component';
import {UpdateReviewComponent} from "./review/update/update-review.component";
import { ReplyCommentComponent } from './comment/reply/reply-comment.component';
import { ReplyReviewComponent } from './review/reply/reply-review.component';


@NgModule({
  declarations: [CreateRestaurantComponent,
    ListRestaurantComponent,
    ViewRestaurantComponent,
    UpdateRestaurantComponent,
    DeleteRestaurantComponent,
    ReviewRestaurantComponent,
    CommentRestaurantComponent,
    ListReviewComponent,
    ListCommentComponent,
    UpdateReviewComponent,
    DeleteReviewComponent,
    UpdateCommentComponent,
    DeleteCommentComponent,
    ReplyCommentComponent,
    ReplyReviewComponent],
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
