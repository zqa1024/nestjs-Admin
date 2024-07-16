import { Injectable, Logger } from '@nestjs/common';

import {
  PrismaOptionsFactory,
  PrismaServiceOptions,
  QueryInfo,
  loggingMiddleware,
} from 'nestjs-prisma';

@Injectable()
export class PrismaService implements PrismaOptionsFactory {
  constructor() {}

  createPrismaOptions(): PrismaServiceOptions | Promise<PrismaServiceOptions> {
    return {
      prismaOptions: {
        log: ['query', 'info', 'warn'],
        errorFormat: 'pretty',
        transactionOptions: {
          maxWait: 10 * 1000,
          timeout: 20 * 1000,
        },
        omit: {
          user: {
            password: true,
          },
        },
      },
      // 项目启动时自动连接数据库，不需要手动调用 $connect 方法，第一个查询将立即响应，否则第一个查询会延时
      explicitConnect: true,
      middlewares: [
        loggingMiddleware({
          logger: new Logger('PrismaMiddleware'),
          logLevel: 'log',
          logMessage: (query: QueryInfo) => {
            return `[Prisma Query] ${query.model}.${query.action} - ${query.executionTime}ms`;
          },
        }),
      ],
    };
  }
}
