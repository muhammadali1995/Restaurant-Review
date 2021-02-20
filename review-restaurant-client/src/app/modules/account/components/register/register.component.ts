import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../account.service';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';

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
              private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.min(8)]],
      password_repeat: [null, [Validators.required, Validators.min(8)]],
      role: [null, [Validators.required]]
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
    }
    return this.password.hasError('min') ? 'Password should be more than 8 characters' : '';
  }


  get passwordRepeat() {
    return this.form.get('password_repeat');
  }

  // confirm password error message
  get getPasswordRepeatErrorMessage() {
    if (this.passwordRepeat.hasError('required')) {
      return 'Confirm password is required';
    }
    return this.passwordRepeat.hasError('min') ? 'Confirm password should be more than 8 characters' : '';
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
      return;
    }

    this.accountService.register(request).pipe(finalize(() => this.submitting = false)).subscribe(res => {
      this.router.navigate(['/account/login']).then(r => {
      });
    }, error => this.error = error);
  }

}
