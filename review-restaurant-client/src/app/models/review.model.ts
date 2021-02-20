import {RestaurantModel} from './restaurant.model';

export interface ReviewModel {
  id: number;
  restaurant: RestaurantModel;
  comment: string;
  reply?: string;
  created_at: Date;
}
