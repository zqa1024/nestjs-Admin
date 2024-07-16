export class AjaxResult<T = any> {
  readonly code: number;
  readonly msg: string;
  readonly data?: T;
  [key: string]: any;

  constructor(code: number, msg: string, data?: T) {
    this.code = code;
    this.msg = msg;
    this.data = data;

    if (data && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  static success<T>(data?: T, msg = 'ok'): AjaxResult<T> {
    let newData: T | { data: T };
    if (typeof data !== 'object' || data instanceof Array) {
      newData = { data };
    } else {
      newData = data;
    }
    return new AjaxResult<T>(200, msg, newData as T);
  }

  static error(msg = 'error', code = 500): AjaxResult<null> {
    return new AjaxResult(code, msg, null);
  }
}
