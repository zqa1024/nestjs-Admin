import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-Prisma';
import { CreateRoleDto, UpdateRoleDto } from '../dtos';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async createRole(dto: CreateRoleDto) {
    console.log('dto>>>>>', dto);
    const result = await this.prisma.role.create({
      data: {
        ...dto,
      },
    });
    return result;
  }

  updateRole(dto: UpdateRoleDto) {
    const { id, ...rest } = dto;
    const result = this.prisma.role.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    });
    return result;
  }
}
