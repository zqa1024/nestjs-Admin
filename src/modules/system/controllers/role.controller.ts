import { Body, Controller, Post } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from '../dtos';
import { DTO_VALIDATION_OPTIONS } from 'src/modules/common/constants';
import { Reflector } from '@nestjs/core';

@Controller('role')
export class RoleController {
  constructor(private reflector: Reflector) {}

  @Post('create')
  async createRole(@Body() dto: CreateRoleDto) {
    console.log('dto', dto, CreateRoleDto);
    const options =
      this.reflector.get(DTO_VALIDATION_OPTIONS, CreateRoleDto) || {};
    console.log('options', options);
    return 'Role created';
  }

  @Post('update')
  async updateRole(@Body() dto: UpdateRoleDto) {
    console.log('dto', dto);
    return 'Role Updated';
  }
}
