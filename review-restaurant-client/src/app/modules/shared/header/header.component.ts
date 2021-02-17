import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../account/account.service';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {UserModel} from '../../../models/user-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faUser = faUserCircle;
  user: UserModel;

  constructor(private accountService: AccountService) {
    this.user = accountService.currentUser;
  }

  ngOnInit(): void {
  }


  logout() {
    this.accountService.logout();
  }

}
