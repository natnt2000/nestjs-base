import { Status } from './role.constant';
import { Document } from 'mongoose';
import { IPermission } from '../permissions/permission.interface';

export interface IRole {
  name: string;
  status: Status;
  permissions: string[] | IPermission[];
}

export type TRoleDoc = Document & IRole;
