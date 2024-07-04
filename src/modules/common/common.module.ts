import { Module, ValidationPipe } from '@nestjs/common';
import { CustomLoggerService } from './customLogger.service';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  APP_FILTER,
  APP_GUARD,
  APP_INTERCEPTOR,
  APP_PIPE,
  HttpAdapterHost,
} from '@nestjs/core';
import { ResponseTransformInterceptor } from './interceptors';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { AtGuard } from './guards';
import config from 'src/config';
import { winstonConfig } from 'logger/winston.logger';
import { WinstonModule } from 'nest-winston';
import { AllExceptionsFilter } from './filters/all-exception.filter';

@Module({
  imports: [
    /**
     * 配置模块
     */
    ConfigModule.forRoot({
      load: [config],
      cache: true,
      isGlobal: true,
    }),
    /**
     * winston日志模块
     * 用于记录日志
     * 通过winstonConfig配置文件配置
     * 通过CustomLoggerService服务调用
     */
    WinstonModule.forRoot(winstonConfig),
    /**
     * 启用redis缓存模块
     */
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const redis = configService.get('redis');
        return {
          type: 'single',
          url: `redis://:${redis.password}@${redis.host}:${redis.port}/${redis.db}`,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    CustomLoggerService,

    /**
     * 全局异常过滤器
     */
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    /**
     * 全局参数校验管道
     */
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true, // 启用白名单，dto中没有声明的属性自动过滤
        transform: true, // 自动类型转换
      }),
    },
    /**
     * prisma 异常筛选器
     * 捕获未处理的 PrismaClientKnownRequestError，并返回不同的
     *  HttpStatus 代码，而不是 500 内部服务器错误
     */
    {
      provide: APP_FILTER,
      useFactory: ({ httpAdapter }: HttpAdapterHost) => {
        return new PrismaClientExceptionFilter(httpAdapter);
      },
      inject: [HttpAdapterHost],
    },
    /**
     * JWT守卫
     */
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    /**
     * 全局返回值转化拦截器
     */
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformInterceptor,
    },
  ],
  exports: [CustomLoggerService],
})
export class CommonModule {}
