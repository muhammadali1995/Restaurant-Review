import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestaurantService} from '../services/restaurant.service';
import {Location} from '@angular/common';
import {RestaurantModel} from '../../../models/restaurant.model';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.scss']
})
export class UpdateRestaurantComponent implements OnInit {


  form: FormGroup;
  error: string;
  submitting: boolean;
  loading: boolean;
  restaurant: RestaurantModel;

  // inject dependencies to the constructor
  constructor(private fb: FormBuilder,
              private restaurantService: RestaurantService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location
  ) {
    this.form = this.fb.group({
      name: [null, Validators.required],
      description: [null],
      address: [null, Validators.required]
    });

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.restaurantService.fetchOne(params.id).subscribe((restaurant: RestaurantModel) => {
        this.restaurant = restaurant;
        this.form.patchValue({
          ...restaurant
        });
      });
    });
  }

  // getters
  get name() {
    return this.form.get('name');
  }

  get getNameErrorMessage() {
    return this.name.hasError('required') ? 'Name is required' : '';
  }


  get address() {
    return this.form.get('address');
  }

  get getAddressErrorMessage() {
    return this.address.hasError('required') ? 'Address is required' : '';
  }

  // on cancel return back to previous view
  onCancel() {
    this.location.back();
  }


  onSubmit() {
    this.submitting = true;
    const request = this.form.value;
    this.restaurantService.update(this.restaurant?.id, request).pipe(finalize(() => {
      this.submitting = false;
    })).subscribe(res => {
      // on success navigate to list
      this.location.back();
      window.alert('Successfully updated');
    }, error => this.error = error);
  }

}
