import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../account.service';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ValidatorService} from '../../../shared/services/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  submitting: boolean;
  error: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private validatorService: ValidatorService,
              private accountService: AccountService) {

    // if the user is already logged in then navigate to home page
    if (accountService.currentUser) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstname: [null, [Validators.required, this.validatorService.noWhitespaceValidator]],
      lastname: [null, [Validators.required, this.validatorService.noWhitespaceValidator]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8), this.validatorService.noWhitespaceValidator]],
      password_repeat: [null, [Validators.required, Validators.minLength(8), this.validatorService.noWhitespaceValidator]],
      role: [null, [Validators.required]]
    });
  }


  get firstname() {
    return this.form.get('firstname');
  }

  // Firstname error message
  get getFirstnameErrorMessage(): string {
    if (this.firstname.hasError('required')) {
      return 'Firstname is required';
    }
    return (this.firstname.errors && this.firstname.errors.whitespace) ? 'Firstname can not be whitespaces' : '';
  }

  get lastname() {
    return this.form.get('lastname');
  }

  // Lastname error message
  get getLastnameErrorMessage(): string {
    if (this.lastname.hasError('required')) {
      return 'Lastname is required';
    }
    return (this.lastname.errors && this.lastname.errors.whitespace) ? 'Lastname can not be whitespaces' : '';
  }

  get email() {
    return this.form.get('email');
  }

  // email error message
  get getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email is required';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
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

  get role() {
    return this.form.get('role');
  }

  get getRoleErrorMessage() {
    return this.role.hasError('required') ? 'Role is required' : '';
  }

  // handle register form submission
  onSubmit() {
    this.submitting = true;
    const request = this.form.value;
    if (request.password !== request.password_repeat) {
      this.error = 'Password do not match confirm password';
      this.submitting = false;
      return;
    }

    this.accountService.register(request).pipe(finalize(() => this.submitting = false)).subscribe(res => {
      this.router.navigate(['/account/login']).then(r => {
      });
    }, (err) => {
      if (err.error.errors && err.error.errors.email) {
        this.error = 'The email has already taken by another user';
      }else  {
        this.error = err.error?.message;
      }
    });
  }

}
