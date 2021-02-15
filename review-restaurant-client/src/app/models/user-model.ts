import {UserRoleModel} from './user-role.model';

export interface UserModel {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: UserRoleModel;
  access_token: string;
}
