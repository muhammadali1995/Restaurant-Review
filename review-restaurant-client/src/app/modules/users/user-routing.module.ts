import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListUserComponent} from './list/list-user.component';
import {UpdateUserComponent} from './update/update-user.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ListUserComponent,
  },
  {
    path: 'update/:id',
    component: UpdateUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
