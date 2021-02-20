import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestaurantService} from '../restaurant.service';
import {finalize} from 'rxjs/operators';
import {Location} from '@angular/common';

@Component({
  selector: 'app-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrls: ['./create-restaurant.component.scss']
})
export class CreateRestaurantComponent implements OnInit {

  form: FormGroup;
  error: string;
  submitting: boolean;

  // inject dependencies to the constructor
  constructor(private fb: FormBuilder,
              private restaurantService: RestaurantService,
              private location: Location
  ) {
    this.form = this.fb.group({
      name: [null, Validators.required],
      description: [null],
      address: [null, Validators.required]
    });

  }

  ngOnInit(): void {
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
    this.restaurantService.create(request).pipe(finalize(() => this.submitting = false)).subscribe(res => {
      // success
      this.showSuccess();
      this.location.back();
    }, error => {
      console.log(error);
    });
  }

  showSuccess() {
    window.alert('Successfully created');
  }
}
