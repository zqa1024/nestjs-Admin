import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiException } from '../exceptions/api.exception';
import { AjaxResult } from '../class';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const { status, result } = this.errorResult(exception);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.status(status).send(result);
  }

  /**
   * 解析错误类型，根据异常对象生成对应的 HTTP 状态码和响应体。
   */
  errorResult(exception: unknown) {
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const code =
      exception instanceof ApiException ? (exception as ApiException) : status;

    let message: string;
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      message = response?.['message'] || response?.['error'] || response;
    } else {
      message = `${exception}`;
    }

    return {
      status,
      result: AjaxResult.error(message, +code),
    };
  }
}
