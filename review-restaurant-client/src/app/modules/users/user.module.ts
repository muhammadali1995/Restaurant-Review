import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {DeleteUserComponent} from './delete/delete-user.component';
import {UpdateUserComponent} from './update/update-user.component';
import {ListUserComponent} from './list/list-user.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ListUserComponent,
    DeleteUserComponent,
    UpdateUserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class UserModule {
}
