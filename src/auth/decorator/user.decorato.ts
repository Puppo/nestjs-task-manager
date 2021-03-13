import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type User = Readonly<{
  id: number;
  username: string;
}>;

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    const { id, username } = req.user;
    return Object.freeze({ id, username });
  },
);
