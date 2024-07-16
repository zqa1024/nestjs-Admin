import { ApiProperty, ApiExtension, ApiHideProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

export class AuthDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email: string;

  @ApiHideProperty()
  @Exclude()
  @ApiProperty()
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
  hash: string;
}
