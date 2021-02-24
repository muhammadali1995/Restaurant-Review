import {UserModel} from './user.model';

export interface ListUserResponse {
  rows: UserModel [];
  total: number;
}
