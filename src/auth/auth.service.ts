import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  hashData(data: string) {
    return bcrypt.hashSync(data, 10);
  }

  async getTokens(userId: number, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: this.config.get<string>('AT_SECRET'),
          expiresIn: 60 * 10,
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: this.config.get<string>('RT_SECRET'),
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  //更新刷新 token
  async updateRtHash(userId: number, rt: string): Promise<void> {
    const hash = await argon.hash(rt);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  //本地注册
  async signupLocal(dto: AuthDto): Promise<Tokens> {
    const hash = await argon.hash(dto.password);

    const newUser = await this.prisma.user
      .create({
        data: {
          email: dto.email,
          hash,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new Error('Credentials incorrect');
          }
        }
        throw error;
      });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    this.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  //本地登录
  async singinLocal(dto: AuthDto): Promise<Tokens> {
    // this.myMethod();
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    console.log('user', user);
    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    const passwordMatches =
      (await argon.verify(user.hash, dto.password)) ||
      (await argon.verify(user.hash, await argon.hash(dto.password)));

    if (!passwordMatches) {
      throw new ForbiddenException('Access Denied');
      // 解释 ForbiddenException？
      // ForbiddenException 是一个内置的异常类，用于表示请求被拒绝的情况。它会返回一个 403 状态码。
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  //获取刷新 token
  async refreshTokens(userId: number, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashedRt) {
      throw new ForbiddenException('Access Denied');
    }
    const reMatches = await argon.verify(user.hashedRt, rt);
    if (!reMatches) {
      throw new ForbiddenException('Access Denied');
    }
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  //登出
  async louout(userId: number): Promise<boolean> {
    if (!userId) {
      throw new ForbiddenException('Access Denied');
    }
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
    return true;
  }
}
