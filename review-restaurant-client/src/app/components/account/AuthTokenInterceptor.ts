import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AccountService} from './account.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private  accountService: AccountService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // when the user is logged in and request to api, add access_token to request headers
    const user = this.accountService.currentUser;
    const isLoggedIn = user && user.access_token;
    const isRequestToApi = req.url.startsWith(apiUrl);

    if (isLoggedIn && isRequestToApi) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${user.access_token}`
        }
      });
    }

    return next.handle(req);
  }
}
