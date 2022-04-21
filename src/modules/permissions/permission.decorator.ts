import { SetMetadata } from '@nestjs/common';
import { Action } from './permission.constant';

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (permissions: Action[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
