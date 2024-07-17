import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { Publish } from 'src/modules/common/decorators';
import { GetCurrentUserId } from 'src/modules/common/decorators/get-current-user-id.decorator';
import { RtGuard } from 'src/modules/common/guards';
import { AtGuard } from 'src/modules/common/guards/at.guards';
import { GetCurrentUser } from 'src/modules/common/decorators/get-current-user.decorator';

import { AuthService } from './auth.service';
import { AuthDto, CreateUserDto, ListUserDto, TokensDto, UserDto } from './dto';
import { Tokens } from './types';
import { CustomLoggerService } from 'src/modules/common/customLogger.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { APIResponse } from '../common/decorators/APIResponse.decorator';
import { User } from '@prisma/client';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly customLogger: CustomLoggerService,
  ) {}

  @Publish()
  @Post('/local/signup')
  @HttpCode(HttpStatus.CREATED)
  @APIResponse(TokensDto)
  async signupLocal(@Body() dto: CreateUserDto): Promise<Tokens> {
    return await this.authService.signupLocal(dto);
  }

  @Publish()
  @Post('/local/sign')
  @HttpCode(HttpStatus.OK)
  async signLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return await this.authService.signLocal(dto);
  }

  @UseGuards(AtGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: Promise<boolean> })
  async logout(@GetCurrentUserId() userId: number): Promise<boolean> {
    console.log('userId', userId);
    return await this.authService.logout(userId);
  }

  @Publish()
  @UseGuards(RtGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return await this.authService.refreshTokens(userId, refreshToken);
  }

  @Get('/currentUser')
  @APIResponse(UserDto)
  async currentUser(@GetCurrentUserId() userId: number): Promise<any> {
    console.log('userId', userId);
    return await this.authService.currentUser(userId);
  }

  /**
   * 获取用户信息
   */
  @Get('users')
  @APIResponse([ListUserDto])
  async getUsers(): Promise<User[]> {
    return await this.authService.getUsers();
  }
}
