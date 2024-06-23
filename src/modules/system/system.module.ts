import { Module } from '@nestjs/common';
import { RoleController } from './controllers';

@Module({
  controllers: [RoleController],
  providers: [],
  exports: [],
})
export class SystemModule {}
