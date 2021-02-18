import {RestaurantModel} from './restaurant.model';

export interface ListRestaurantResponse {
  rows: RestaurantModel[];
  total: number;
}
