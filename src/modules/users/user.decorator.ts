import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from './user.interface';

export const User = createParamDecorator(
  (data: IUser, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
