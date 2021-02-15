import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../../models/user-model';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Router} from "@angular/router";

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public userSubject: BehaviorSubject<UserModel>;
  public user: Observable<UserModel>;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  public get currentUser(): UserModel {
    return this.userSubject.value;
  }

  // login accepts a request object that has login and password
  login(request: { username: string, password: string }) {
    return this.http.post<UserModel>(`${apiUrl}/user/login`, request).pipe(map(user => {
      // save the logged in user to localStorage to get when page refresh
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.userSubject.next(user);
      return user;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);

    // after removing the user form local storage go back to login
    this.router.navigate(['login']);
  }


  register(user: UserModel) {
    this.http.post(`${apiUrl}/user/register`, user);
  }

}
