import {RestaurantModel} from './restaurant.model';
import {UserModel} from './user.model';

export interface ReviewModel {
  id: number;
  restaurant: RestaurantModel;
  rating: number;
  comment: string;
  reply?: string;
  date_of_visit: string;
  user: UserModel;
  created_at: Date;
}
