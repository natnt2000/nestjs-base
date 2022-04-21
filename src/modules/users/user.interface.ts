import { Document } from 'mongoose';
import { IRole } from '../roles/role.interface';

export interface IUser {
  email: string;
  password: string;
  fullName: string;
  role: string | IRole;
}

export type IUserDoc = IUser & Document;
