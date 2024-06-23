import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }
}
