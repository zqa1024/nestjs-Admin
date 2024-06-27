import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { DtoValidation } from 'src/modules/common/decorators';
import { PartialType } from '@nestjs/swagger';

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
