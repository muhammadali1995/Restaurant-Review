import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {UserModel} from '../../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  apiUrl = `${environment.apiUrl}/user`;
  public userSubject: BehaviorSubject<UserModel>;
  public user: Observable<UserModel>;

  constructor(private http: HttpClient,
              private router: Router) {
    this.userSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.user = this.userSubject.asObservable();
  }

  public get currentUser(): UserModel {
    return this.userSubject.value;
  }

  // login accepts a request object that has login and password
  login(request: { username: string, password: string }) {
    return this.http.post<UserModel>(`${this.apiUrl}/login`, request).pipe(map(user => {
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
    this.router.navigate(['/account/login']);
  }


  register(user: UserModel) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

}
