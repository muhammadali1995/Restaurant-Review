import {Component, Input, OnInit} from '@angular/core';
import {RestaurantModel} from '../../../../models/restaurant.model';
import {faPencilAlt, faTrashAlt, faReply} from '@fortawesome/free-solid-svg-icons';
import {ReviewModel} from '../../../../models/review.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteReviewComponent} from '../delete/delete-review.component';
import {ReplyReviewComponent} from '../reply/reply-review.component';
import {RestaurantService} from '../../restaurant.service';
import {Action} from '../../../../models/action';
import {AuthGuard} from '../../../account/auth.guard';

@Component({
  selector: 'app-list-review',
  templateUrl: './list-review.component.html',
  styleUrls: ['./list-review.component.scss']
})
export class ListReviewComponent implements OnInit {

  @Input() restaurant: RestaurantModel;
  faTrash = faTrashAlt;
  faPencil = faPencilAlt;
  faReply = faReply;

  constructor(private modalService: NgbModal,
              private authGuardService: AuthGuard,
              private restaurantService: RestaurantService) {
  }

  ngOnInit(): void {
  }

  // delete a review from the server and if successful remove from the view as well
  delete(review: ReviewModel) {
    const index = this.restaurant.reviews.indexOf(review);
    const modal = this.modalService.open(DeleteReviewComponent);
    modal.componentInstance.review = review;
    modal.result.then(res => {
      if (res === 'success') {
        this.restaurant.reviews.splice(index, 1);
        this.fetchRestaurant();
      }
    });
  }

  reply(review: ReviewModel) {
    const index = this.restaurant.reviews.indexOf(review);
    const modal = this.modalService.open(ReplyReviewComponent);
    modal.componentInstance.review = review;
    modal.result.then((res: ReviewModel) => {
      if (res && res.id) {
        this.restaurant.reviews[index] = res;

        this.fetchRestaurant();
      }
    });
  }


  // re-fetch restaurant to get the changes of the review stats

  fetchRestaurant() {
    this.restaurantService.fetchOne(this.restaurant.id).subscribe((restaurant: RestaurantModel) => {
      this.restaurant = restaurant;
    });
  }

  get canEdit() {
    return this.authGuardService.can(Action.UPDATE_REVIEW);
  }

  get canDelete() {
    return this.authGuardService.can(Action.DELETE_REVIEW);
  }

  get canReply() {
    return this.authGuardService.can(Action.REPLY_REVIEW);
  }
}
