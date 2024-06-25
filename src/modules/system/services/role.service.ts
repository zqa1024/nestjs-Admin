import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateRoleDto } from '../dtos';

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

  updateRole() {
    return 'Role Updated';
  }
}
