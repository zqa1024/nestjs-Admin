import { Injectable, Inject, LoggerService } from '@nestjs/common';
import { Logger } from 'winston';

@Injectable()
export class CustomLoggerService implements LoggerService {
  constructor(@Inject('winston') private readonly logger: Logger) {}

  log(message: string) {
    this.logger?.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, { trace });
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}

export function provide(): (
  target: typeof CustomLoggerService,
) => void | typeof CustomLoggerService {
  throw new Error('Function not implemented.');
}
