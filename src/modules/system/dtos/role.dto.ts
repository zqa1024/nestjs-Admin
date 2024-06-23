import {
  IsDefined,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { DtoValidation } from 'src/modules/common/decorators';
import { PartialType } from '@nestjs/swagger';

@DtoValidation({ groups: ['create'] })
export class CreateRoleDto {
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  icon: string;

  @IsOptional()
  label!: string;

  @IsNotEmpty()
  component: string;

  @IsNotEmpty()
  route: string;

  @IsNotEmpty()
  type: number;

  @IsNotEmpty()
  hide: boolean;

  @IsNotEmpty()
  status: number;

  @IsOptional()
  order?: number;

  @IsOptional()
  parentId?: string;

  @IsOptional()
  children?: CreateRoleDto[];
}

@DtoValidation({ groups: ['update'] })
export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @IsDefined({ groups: ['update'], message: 'ID 必须指定' })
  @IsNotEmpty({ message: 'ID 不能为空' })
  @IsString({ message: 'ID 必须是字符串类型' })
  id!: string;
}
