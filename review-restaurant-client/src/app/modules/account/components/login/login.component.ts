import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../account.service';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  error: string;
  submitting: boolean;

  constructor(private fb: FormBuilder,
              private router: Router,
              private accountService: AccountService) {

    // if the user is already logged in return to the home page
    if (this.accountService.currentUser) {
      this.router.navigate(['/']);
    }

    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.min(8)]]
    });
  }

  ngOnInit(): void {
  }


  // getters for validation

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }


  // email error message
  get getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email is required';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  // password error message
  get getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Password is required';
    }

    return this.email.hasError('min') ? 'Password must be more 8 character' : '';
  }

  onSubmit() {
    this.submitting = true;
    const request = this.form.value;
    this.accountService.login(request).pipe(finalize(() => this.submitting = false)).subscribe(res => {
      this.router.navigate(['/']);
    }, error => {
      if (error.status === 422) {
        this.error = 'Incorrect email or password';
      } else {
        this.error = error.message;
      }
    });
  }

}
