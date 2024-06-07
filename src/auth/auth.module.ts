import { Logger, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [JwtModule.register({}), CommonModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AtStrategy,
    RtStrategy,
    {
      provide: 'UsersLogger',
      useFactory: () => new Logger('Users'),
    },
  ],
})
export class AuthModule {}
