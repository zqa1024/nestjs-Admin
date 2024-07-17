import {
  ApiProperty,
  ApiExtension,
  ApiHideProperty,
  ApiPropertyOptional,
  PartialType,
  OmitType,
  PickType,
} from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  isEnum,
} from 'class-validator';
import { Exclude, Type } from 'class-transformer';
import { Role } from '@prisma/client';
import { RoleDto } from 'src/modules/system/dtos';

export class AuthDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email: string;

  // @Exclude()
  @ApiProperty({ writeOnly: true })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiHideProperty()
  @Exclude()
  @IsString()
  @IsOptional()
  hash: string;
}

export class UserDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiPropertyOptional({ type: 'string', format: 'date-time' , readOnly: true })
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiPropertyOptional({ type: 'string', format: 'date-time' , readOnly: true })
  @IsDate()
  @Type(() => Date)
  updatedAt: Date;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ writeOnly: true })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiPropertyOptional({ writeOnly: true })
  @IsString()
  @Exclude()
  hash: string;

  @ApiPropertyOptional({ writeOnly: true })
  @IsString()
  @IsOptional()
  @Exclude()
  hashedRt?: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty()
  @IsInt()
  status: number;

  @ApiProperty({
    type: [RoleDto],
    // isArray: true,
    required: false,
    examples: [RoleDto],
  })
  @IsArray()
  roles: RoleDto[];
}

export class CreateUserDto extends PickType(UserDto, ['email', 'username', 'password']) {}

//例如：我们省略掉 FeatureDto 中的 articles、subscribes，作为List表示
export class ListUserDto extends OmitType(UserDto, ['hash', 'hashedRt', 'password']) {}

//我们取出里面的几个字段作为我们的新的dto
export class updateUserDto extends PickType(UserDto, ['id', 'username', 'status', 'avatar', 'roles']) {}

export class TokensDto  {
  @ApiProperty({ description: '访问令牌' })
  access_token: string;

  @ApiProperty({ description: '刷新令牌' })
  refresh_token: string;
};