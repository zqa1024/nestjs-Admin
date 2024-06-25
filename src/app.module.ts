import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AtGuard } from './modules/common/guards/at.guards';
import { WinstonModule } from 'nest-winston';

import { winstonConfig } from '../logger/winston.logger';
import { SystemModule } from './modules/system/system.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AppValidationPipe } from './modules/common/providers';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    SystemModule,
    ConfigModule.forRoot({ isGlobal: true }),
    WinstonModule.forRoot(winstonConfig),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_PIPE,
      useValue: new AppValidationPipe({
        transform: true, // 是否自动转换类型
        forbidUnknownValues: false, // 是否禁止未知属性
        validationError: { target: false }, // 是否返回完整的错误信息
        whitelist: true, // 是否只返回白名单属性
      }),
    },
  ],
})
export class AppModule {}
