import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './components/main.component';
import {AuthGuard} from '../account/auth.guard';
import {Roles} from '../../models/roles';

const routes: Routes = [{
  path: '',
  component: MainComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'restaurant'
    },
    {
      path: 'restaurant',
      loadChildren: () => import('./../restaurants/restaurant.module').then(m => m.RestaurantModule),
    },
    {
      // user module is access for only 'ADMIN'
      path: 'user',
      loadChildren: () => import('../users/user.module').then(m => m.UserModule),
      data: {roles: [Roles.ADMIN]},
      canActivate: [AuthGuard],
      canActivateChild: [AuthGuard],
    }
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
