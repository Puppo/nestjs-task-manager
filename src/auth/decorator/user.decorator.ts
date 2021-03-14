import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../data-access/user.entity';

export class User {
  constructor(private readonly userEntity: UserEntity) {}

  getUser(): UserEntity {
    return this.userEntity;
  }
}

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return new User(req.user);
  },
);
