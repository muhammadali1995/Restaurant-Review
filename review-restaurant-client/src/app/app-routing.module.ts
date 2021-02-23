import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {Roles} from './models/roles';
import {AuthGuard} from './modules/account/auth.guard';


const routes: Routes = [

  {
    path: 'account',
    loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)
  },
  {
    // main modules is only accessible for authorized users
    path: '',
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
    data: {roles: [Roles.ADMIN, Roles.OWNER, Roles.CUSTOMER]},
    canActivate: [AuthGuard],
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
