import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  CreateRoleDto,
  UpdateRoleDto,
  CreatePermissionDto,
  UpdatePermissionDto,
} from '../dtos';
import { DTO_VALIDATION_OPTIONS } from 'src/modules/common/constants';
import { Reflector } from '@nestjs/core';
import { PermissionService } from '../services';

@Controller('permission')
export class PermissionController {
  constructor(
    private reflector: Reflector,
    private permissionService: PermissionService,
  ) {}

  @Get('getList')
  async getList() {
    console.log('getList');
    return await this.permissionService.getList();
  }

  @Post('create')
  async createRole(@Body() dto: CreatePermissionDto) {
    console.log('dto121212121212', dto, CreateRoleDto);

    return await this.permissionService.createPermission(dto);
  }

  @Post('update')
  async updateRole(@Body() dto: UpdatePermissionDto) {
    console.log('dto', dto);
    return await this.permissionService.updatePermission(dto);
  }
}
