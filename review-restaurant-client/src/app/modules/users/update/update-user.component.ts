import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserModel} from '../../../models/user-model';
import {Location} from '@angular/common';
import {UserService} from '../user.service';
import {finalize} from 'rxjs/operators';
import {ValidatorService} from "../../shared/services/validator.service";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  form: FormGroup;
  submitting: boolean;
  error: string;
  user: UserModel;

  constructor(private fb: FormBuilder,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private validatorService: ValidatorService,
              private userService: UserService) {
    this.form = this.fb.group({
      firstname: [null, [Validators.required, validatorService.noWhitespaceValidator]],
      lastname: [null, [Validators.required, validatorService.noWhitespaceValidator]],
      password: [null, [Validators.minLength(8), validatorService.noWhitespaceValidator]],
      password_repeat: [null, [Validators.minLength(8), validatorService.noWhitespaceValidator]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userService.fetchOne(params.id).subscribe(user => {
        this.user = user;
        this.form.patchValue({
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
        });
      });
    });
  }


  get firstname() {
    return this.form.get('firstname');
  }

  // Firstname error message
  get getFirstnameErrorMessage(): string {
    return this.firstname.hasError('required') ? 'Firstname is required' : '';
  }

  get lastname() {
    return this.form.get('lastname');
  }

  // Lastname error message
  get getLastnameErrorMessage(): string {
    return this.lastname.hasError('required') ? 'Lastname is required' : '';
  }


  get password() {
    return this.form.get('password');
  }

  // password error message
  get getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Password is required';
    } else if (this.password.errors && this.password.errors.whitespace) {
      return 'Password can not be whitespaces';
    }
    return (this.password.errors && this.password.errors.minlength) ? 'Password should be more than 8 characters' : '';
  }


  get passwordRepeat() {
    return this.form.get('password_repeat');
  }

  // confirm password error message
  get getPasswordRepeatErrorMessage() {
    if (this.passwordRepeat.hasError('required')) {
      return 'Confirm password is required';
    } else if (this.passwordRepeat.errors && this.passwordRepeat.errors.whitespace) {
      return 'Confirm password can not be whitespaces';
    }
    return (this.passwordRepeat.errors && this.passwordRepeat.errors.minlength) ? 'Confirm password should be more than 8 characters' : '';
  }

  // handle update form submission
  onSubmit() {
    this.submitting = true;
    const request = this.form.value;

    if (request.password !== request.password_repeat) {
      this.error = 'Password do not match confirm password';
      this.submitting = false;
      return;
    }

    delete request.password_repeat;

    this.userService.update(this.user.id, request).pipe(finalize(() => this.submitting = false)).subscribe(response => {
      this.error = '';
      window.alert('Successfully updated');
      this.location.back();
    }, error => {
      this.error = error.error?.message;
    });

  }

  onCancel() {
    this.location.back();
  }

}
