import { Module } from '@nestjs/common';
import { RoleController, PermissionController } from './controllers';
import { PermissionService, RoleService } from './services';

@Module({
  controllers: [RoleController, PermissionController],
  providers: [RoleService, PermissionService],
  exports: [],
})
export class SystemModule {}
