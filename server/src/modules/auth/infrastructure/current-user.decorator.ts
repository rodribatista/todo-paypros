import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import type { CurrentUserData } from '../application/interfaces/current-user.interface';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user?: CurrentUserData }>();
    if (!request.user) {
      throw new InternalServerErrorException(
        'user not found in request object',
      );
    }
    return request.user.userId;
  },
);
