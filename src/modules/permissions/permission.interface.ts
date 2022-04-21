import { Feature, Action } from './permission.constant';
import { Document } from 'mongoose';

export interface IPermission {
  feature: Feature;
  action: Action;
}

export type TPermissionDoc = Document & IPermission;
