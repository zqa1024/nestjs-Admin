import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export type User = any;

/**
 * 用户服务类，用于处理用户相关的业务逻辑。
 */
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * 根据电子邮件查找用户。
   * @param email - 要查找的用户的电子邮件。
   * @returns 匹配的用户对象，如果找不到则返回 undefined。
   */
  async findOne(email: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }
}
