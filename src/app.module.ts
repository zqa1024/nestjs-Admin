import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AtGuard } from './common/guards/at.guards';
import { WinstonModule } from 'nest-winston';

import { winstonConfig } from '../logger/winston.logger';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    WinstonModule.forRoot(winstonConfig),
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
