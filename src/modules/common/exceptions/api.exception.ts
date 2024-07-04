import { HttpException } from '@nestjs/common';

export class ApiException extends HttpException {
  private errCode: number;

  constructor(msg: string, errCode?: number) {
    // 权限问题一律使用 401 错误码
    if (errCode && errCode == 401) {
      super(msg, 200);
      this.errCode = 401;
    } else {
      // 其他错误一律使用 500 错误码
      super(msg, errCode ?? 200);
      this.errCode = errCode ?? 500;
    }
  }
  getErrCode(): number {
    return this.errCode;
  }
}
