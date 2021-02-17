import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { CreateRestaurantComponent } from './create/create-restaurant.component';
import { ListRestaurantComponent } from './list/list-restaurant.component';
import {SharedModule} from '../shared/shared.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";

;


@NgModule({
  declarations: [CreateRestaurantComponent, ListRestaurantComponent],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgbPaginationModule,
  ]
})
export class RestaurantModule { }
