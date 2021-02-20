import {CommentModel} from './comment-model';
import {ReviewModel} from './review.model';

export interface RestaurantModel {
  id: number;
  name: string;
  address: string;
  description: string;
  comments: CommentModel [];
  reviews: ReviewModel [];
}
