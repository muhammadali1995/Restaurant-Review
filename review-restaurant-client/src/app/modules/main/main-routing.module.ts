import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './components/main.component';

const routes: Routes = [{
  path: '',
  component: MainComponent,
  children: [
    {
      path: 'restaurant',
      loadChildren: () => import('./../restaurants/restaurant.module').then(m => m.RestaurantModule)
    },
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
