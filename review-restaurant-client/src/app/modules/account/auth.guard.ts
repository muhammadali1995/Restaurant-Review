import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {AccountService} from './account.service';
import {Injectable} from '@angular/core';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private  router: Router, private authService: AccountService) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const currentUser = this.authService.currentUser;
    return this.runAuthCheck(currentUser, route);
  }

  async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const currentUser = this.authService.currentUser;
    return this.runAuthCheck(currentUser, childRoute);
  }

  private runAuthCheck(currentUser: any, route: ActivatedRouteSnapshot) {

    // the user is logged in then check if has access to route
    if (currentUser) {
      // if has access to route return true otherwise navigate to homepage and return false
      if (route.data.roles && route.data.roles.indexOf(currentUser.role) !== -1) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/account/login']);
    return false;
  }

}
