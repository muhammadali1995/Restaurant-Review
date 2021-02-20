import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RestaurantService} from '../../restaurant.service';
import {RestaurantModel} from '../../../../models/restaurant.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {faStarHalf} from '@fortawesome/free-solid-svg-icons';
import {ReviewService} from '../review.service';

@Component({
  selector: 'app-review-restaurant',
  templateUrl: './review-restaurant.component.html',
  styleUrls: ['./review-restaurant.component.scss']
})
export class ReviewRestaurantComponent implements OnInit {

  restaurant: RestaurantModel;
  error: string;
  currentRate = 0;
  form: FormGroup;

  faStarLeftHalf = faStarHalf;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder,
              private reviewService: ReviewService,
              private restaurantService: RestaurantService) {
    this.form = this.fb.group({
      restaurant_id: [null, Validators.required],
      rating: [null, Validators.required],
      comment: null
    });

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      // set the id of the restaurant being reviewed
      this.form.get('restaurant_id').setValue(params.id);

      this.restaurantService.fetchOne(params.id).subscribe((restaurant: RestaurantModel) => {
        this.restaurant = restaurant;
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
    this.reviewService.create(request).subscribe(res => {
      window.alert('Successfully created');
      this.location.back();
    }, err => this.error = err.error?.message);
  }

}
