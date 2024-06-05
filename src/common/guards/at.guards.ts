import { ExecutionContext } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

export class AtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const isPublish = context.getHandler().isPublish;
    const isPublish = Reflect.getMetadata('isPublish', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublish) {
      return true;
    }

    return super.canActivate(context);
  }
}
