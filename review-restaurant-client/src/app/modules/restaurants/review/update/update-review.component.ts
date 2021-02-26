import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faStarHalf} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';
import {DatePipe, Location} from '@angular/common';
import {ReviewService} from '../review.service';
import {ReviewModel} from '../../../../models/review.model';

@Component({
  selector: 'app-update-review',
  templateUrl: './update-review.component.html',
  styleUrls: ['./update-review.component.scss']
})
export class UpdateReviewComponent implements OnInit {

  review: ReviewModel;
  error: string;
  currentRate = 0;
  form: FormGroup;

  faStarLeftHalf = faStarHalf;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder,
              private reviewService: ReviewService) {
    this.form = this.fb.group({
      rating: [null, Validators.required],
      date_of_visit: [null, Validators.required],
      comment: null
    });

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      // fetch review details and set to the form
      this.reviewService.fetchOne(params.reviewId).subscribe((review: ReviewModel) => {
        this.review = review;
        this.form.patchValue({
          rating: review.rating,
          date_of_visit: review.date_of_visit,
          comment: review.comment
        });

      }, error => this.error = error);
    });
  }


  get rating() {
    return this.form.get('rating');
  }

  // get rate error
  get getRateErrorMessage() {
    return this.rating.value === null ? 'Rate is required' : '';
  }

  onCancel() {
    this.location.back();
  }

  onSubmit() {
    const request = this.form.value;
    const datePipe = new DatePipe('en-US');

    // send a proper formatted date for the api using date pipe
    request.date_of_visit = datePipe.transform(request.date_of_visit, 'yyyy-MM-dd');
    this.reviewService.update(this.review.id, request).subscribe(res => {
      window.alert('Successfully updated');
      this.location.back();
    }, err => this.error = err.error?.message);
  }
}
