import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, connext: ExecutionContext): number => {
    const request = connext.switchToHttp().getRequest();
    console.log('request.user: ', request.user);
    const user = request?.user;
    return user?.sub;
  },
);
