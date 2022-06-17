import { IClient } from './client.model';
import { IRole } from './role.model';

export interface IUser {
  _id?: string;
  firstnames?: string;
  lastname?: string;
  fullnames?: string;
  activated?: boolean;
  client?: IClient;
  emailAddress?: string;
  phoneNumber?: string;
  profilePicture?: string;
  role?: IRole;
}
