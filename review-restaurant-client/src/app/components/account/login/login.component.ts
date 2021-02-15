import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  error: Error;

  constructor(private fb: FormBuilder,
              private accountService: AccountService) {
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
  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email is required';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  // password error message
  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Password is required';
    }

    return this.email.hasError('min') ? 'Password must be more 8 character' : '';
  }

  onSubmit() {
    const request = this.form.value;
    this.accountService.login(request).subscribe(res => {
    }, error => error);
  }

}
