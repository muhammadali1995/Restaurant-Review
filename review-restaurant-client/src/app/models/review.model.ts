import {RestaurantModel} from './restaurant.model';
import {UserModel} from "./user.model";

export interface ReviewModel {
  id: number;
  restaurant: RestaurantModel;
  rating: number;
  comment: string;
  reply?: string;
  user: UserModel;
  created_at: Date;
}
