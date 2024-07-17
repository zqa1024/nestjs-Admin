import {
  IsArray,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { DtoValidation } from 'src/modules/common/decorators';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { UserDto } from '../../auth/dto';
import { CreatePermissionDto } from './permission.dto';

@DtoValidation({ groups: ['create'] })
export class CreateRoleDto {
  @IsDefined({ groups: ['create'], message: 'name 必须指定' })
  @IsNotEmpty()
  @IsString({ message: 'name 必须是字符串类型' })
  name: string;

  // @IsOptional()
  // icon: string;

  @IsDefined({ groups: ['create'] })
  @IsOptional({ groups: ['update'] })
  label: string;

  // @IsNotEmpty()
  // component: string;

  // @IsNotEmpty()
  // route: string;

  // @IsNotEmpty()
  // type: number;

  // @IsNotEmpty()
  // hide: boolean;

  @IsDefined({ groups: ['create'], message: 'status 必须指定' })
  @IsNotEmpty()
  status: number;

  @IsOptional()
  order?: number;

  @IsOptional()
  desc?: string;

  // @IsOptional()
  // parentId?: string

  // @IsOptional()
  // children?: CreateRoleDto[];
}

@DtoValidation({ groups: ['update'] })
export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @IsDefined({ groups: ['update'], message: 'ID 必须指定' })
  @IsNotEmpty({ message: 'ID 不能为空' })
  @IsNumber()
  id: number;

  @IsDefined({ groups: ['update'], message: 'ID 必须指定' })
  // @IsNotEmpty({ message: 'ID 不能为空' })
  // @IsString({ message: 'ID 必须是字符串类型' })
  name!: string;
}

export class RoleDto {
  @ApiProperty({ required: false })
  @IsInt({ groups: ['update'] })
  @ValidateIf((o) => o.id !== undefined, { groups: ['update'] })
  id?: number;

  @ApiProperty({ description: '角色名称' })
  @IsString({ groups: ['create', 'update'] })
  name: string;

  @ApiPropertyOptional({ description: '角色状态, 0: 禁用, 1: 启用' })
  @IsInt({ groups: ['create', 'update'] })
  @IsOptional({ groups: ['create', 'update'] })
  status?: number;

  @ApiProperty({ description: '角色别名' })
  @IsString({ groups: ['create', 'update'] })
  label: string;

  @ApiPropertyOptional({ description: '排序' })
  @IsInt({ groups: ['create', 'update'] })
  @IsOptional({ groups: ['create', 'update'] })
  order?: number;

  @ApiPropertyOptional({ description: '描述' })
  @IsString({ groups: ['create', 'update'] })
  @IsOptional({ groups: ['create', 'update'] })
  desc?: string;

  @ApiPropertyOptional({
    type: [CreatePermissionDto],
    description: '权限列表',
    isArray: true,
    examples: [CreatePermissionDto],
  })
  @IsArray({ groups: ['create', 'update'] })
  @IsOptional({ groups: ['create', 'update'] })
  permissions?: CreatePermissionDto[];

  @ApiPropertyOptional({
    type: [UserDto],
    description: '用户列表',
    required: false,
    isArray: true,
    examples: [UserDto],
  })
  @IsArray({ groups: ['create', 'update'] })
  @IsOptional({ groups: ['create', 'update'] })
  user?: UserDto[];
}
