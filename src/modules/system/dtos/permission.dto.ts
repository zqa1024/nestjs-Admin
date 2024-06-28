import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePermissionDto {
  /**权限名称*/
  @IsString()
  name: string;

  // 图标
  @IsString()
  @IsOptional()
  icon: string;

  // 标签
  @IsString()
  @IsOptional()
  label: string;

  // 组件
  @IsOptional({ groups: ['update'] })
  @IsString()
  component: string;

  // 路由
  @IsOptional({ groups: ['update'] })
  @IsString()
  route: string;

  // 类型 1:目录 2: 菜单 3: 按钮
  @IsOptional({ groups: ['update'] })
  @IsNumber()
  type: number;

  // 是否隐藏
  @IsOptional({ groups: ['update'] })
  @IsBoolean()
  hide: boolean;

  // 状态
  @IsOptional({ groups: ['update'] })
  @IsNumber()
  status: number;

  // 排序
  @IsOptional()
  order?: number;

  //父级ID
  @IsOptional()
  parentId?: string;

  // 子级
  // @IsOptional()
  // children?: CreatePermissionDto[];

  // 父级
  // @IsOptional()
  // parent?: CreatePermissionDto;
}

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  @IsString({ message: 'ID 必须是字符串类型' })
  id: string;
}
