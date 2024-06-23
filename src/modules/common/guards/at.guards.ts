import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

export class AtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
    console.log('AtGuard', this.reflector, Reflector);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const isPublish = context.getHandler().isPublish;
    const reflector = new Reflector();
    const isPublish = reflector.getAllAndOverride('isPublish', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublish) {
      return true;
    }

    return super.canActivate(context);
  }
}
