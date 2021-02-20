import {UserModel} from './user-model';

export interface CommentModel {
  id: number;
  comment: string;
  created_at: Date;
  user: UserModel;
}
