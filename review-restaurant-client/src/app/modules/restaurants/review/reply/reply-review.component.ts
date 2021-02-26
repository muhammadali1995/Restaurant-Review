import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ReviewModel} from '../../../../models/review.model';
import {ReviewService} from '../review.service';
import {ValidatorService} from '../../../shared/services/validator.service';

@Component({
  selector: 'app-reply-review',
  templateUrl: './reply-review.component.html',
  styleUrls: ['./reply-review.component.scss']
})
export class ReplyReviewComponent implements OnInit {

  @Input() review: ReviewModel;

  error: string;
  form: FormGroup;
  saving: boolean;

  constructor(private activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private validatorService: ValidatorService,
              private reviewService: ReviewService) {
    this.form = this.fb.group({
      // set required and value can not be white space validations
      reply: [null, [Validators.required, this.validatorService.noWhitespaceValidator]]
    });
  }

  ngOnInit(): void {

    this.reviewService.fetchOne(this.review.id)
      .subscribe(
        (review: ReviewModel) => {
          this.review = review;
        },

        err => this.error = err.error.message);
  }


  get reply() {
    return this.form.get('reply');
  }


  // getter for showing errors of a reply field
  get getReplyError() {
    if (this.reply.hasError('required')) {
      return 'Comment is required';
    }
    return this.reply.hasError('whitespace') ? 'Reply can not be whitespaces' : '';

  }

  onClose() {
    this.activeModal.close();
  }

  onSubmit() {
    this.saving = true;
    const request = this.form.value;
    request.reviewId = this.review.id;
    this.reviewService.reply(request)
      .subscribe((updatedReview: ReviewModel) => {
        this.activeModal.close(updatedReview);
      }, err => this.error = err.error.message);
  }

}
