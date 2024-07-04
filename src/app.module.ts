import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModules } from './modules/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { SystemModule } from './modules/system/system.module';

@Module({
  imports: [PrismaModules, UsersModule, AuthModule, SystemModule],
  providers: [],
})
export class AppModule {}
