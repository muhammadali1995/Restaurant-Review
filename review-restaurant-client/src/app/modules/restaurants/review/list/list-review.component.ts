import {Component, Input, OnInit} from '@angular/core';
import {RestaurantModel} from '../../../../models/restaurant.model';
import {faPencilAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {ReviewModel} from '../../../../models/review.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteReviewComponent} from '../delete/delete-review.component';

@Component({
  selector: 'app-list-review',
  templateUrl: './list-review.component.html',
  styleUrls: ['./list-review.component.scss']
})
export class ListReviewComponent implements OnInit {

  @Input() restaurant: RestaurantModel;
  faTrash = faTrashAlt;
  faPencil = faPencilAlt;

  constructor(private modalService: NgbModal) {
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
      }
    });
  }

}
