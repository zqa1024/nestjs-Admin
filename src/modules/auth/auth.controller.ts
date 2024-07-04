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
import { AuthDto } from './dto';
import { Tokens } from './types';
import { CustomLoggerService } from 'src/modules/common/customLogger.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly customLogger: CustomLoggerService,
  ) {}

  @Publish()
  @Post('/local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  @Publish()
  @Post('/local/signin')
  @HttpCode(HttpStatus.OK)
  singinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    // this.customLogger.log('Hello world');
    return this.authService.singinLocal(dto);
  }

  @UseGuards(AtGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  louout(@GetCurrentUserId() userId: number): Promise<boolean> {
    // console.log('userId', userId);

    return this.authService.louout(userId);
  }

  @Publish()
  @UseGuards(RtGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Get('/currentUser')
  async currentUser(@GetCurrentUserId() userId: number): Promise<any> {
    console.log('userId', userId);
    return await this.authService.currentUser(userId);
  }
}
