import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ReviewService} from '../review.service';
import {ReviewModel} from '../../../../models/review.model';

@Component({
  selector: 'app-delete-review',
  templateUrl: './delete-review.component.html',
  styleUrls: ['./delete-review.component.scss']
})
export class DeleteReviewComponent implements OnInit {

  error: string;
  @Input() review: ReviewModel;

  constructor(private activeModal: NgbActiveModal,
              private reviewService: ReviewService) {
  }

  ngOnInit(): void {
  }

  onClose() {
    this.activeModal.close('close');
  }

  delete() {
    this.reviewService.delete(this.review.id).subscribe(res => {
      window.alert('Successfully deleted');
      this.activeModal.close('success');
    }, err => this.error = err.err.message);
  }
}
