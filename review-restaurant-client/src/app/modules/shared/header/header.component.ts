import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../account/account.service';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {Roles} from '../../../models/roles';
import {UserModel} from '../../../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faUser = faUserCircle;
  user: UserModel;
  public isMenuCollapsed = true;

  constructor(private accountService: AccountService,
              private router: Router,
              private authService: AccountService) {
    this.user = accountService.currentUser;
  }

  ngOnInit(): void {
  }


  logout() {
    this.accountService.logout();
  }

  go(link) {
    this.router.navigate([link]);
  }

  // check if the current user is admin to show
  get isAdmin() {
    return this.authService.currentUser?.role === Roles.ADMIN;
  }
}
