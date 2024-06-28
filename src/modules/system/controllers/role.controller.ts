import { Body, Controller, Post } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from '../dtos';
import { DTO_VALIDATION_OPTIONS } from 'src/modules/common/constants';
import { Reflector } from '@nestjs/core';
import { RoleService } from '../services';

@Controller('role')
export class RoleController {
  constructor(
    private reflector: Reflector,
    private roleService: RoleService,
  ) {}

  @Post('create')
  async createRole(@Body() dto: CreateRoleDto) {
    console.log('dto', dto, CreateRoleDto);
    const options =
      this.reflector.get(DTO_VALIDATION_OPTIONS, CreateRoleDto) || {};
    console.log('options', options);
    return await this.roleService.createRole(dto);
  }

  @Post('update')
  async updateRole(@Body() dto: UpdateRoleDto) {
    console.log('dto', dto);
    return await this.roleService.updateRole(dto);
  }
}
