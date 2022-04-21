import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Status } from '../roles/role.constant';
import { Action } from './permission.constant';
import { PERMISSIONS_KEY } from './permission.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<Action[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const {
      user: {
        role: { status, permissions },
      },
    } = context.switchToHttp().getRequest();

    if (status === Status.INACTIVE) {
      return false;
    }

    const newPermissions = permissions.map((value) => value.action);

    return requiredPermissions.some((permission) =>
      newPermissions.includes(permission),
    );
  }
}
