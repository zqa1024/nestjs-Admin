import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map } from 'rxjs/operators';
import { AjaxResult } from '../class';
import type { Observable } from 'rxjs';

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        console.log('data>>>>>>', data);
        const keep = this.reflector.getAllAndOverride<boolean>('keep', [
          context.getHandler(),
          context.getClass(),
        ]);
        if (keep) {
          return data;
        }
        const response = context.switchToHttp().getResponse();

        response.header('Content-Type', 'application/json; charset=utf-8');
        return AjaxResult.success<T>(data);
      }),
    );
  }
}

interface Response<T> {
  code: number;
  msg: string;
  data: T;
}
