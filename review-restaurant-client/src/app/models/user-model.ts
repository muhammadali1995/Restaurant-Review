import {Roles} from './roles';

export interface UserModel {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: Roles;
  access_token: string;
}
