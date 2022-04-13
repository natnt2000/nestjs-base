import { Document } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  fullName: string;
}

export type IUserDoc = IUser & Document;
