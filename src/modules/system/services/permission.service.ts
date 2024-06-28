import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreatePermissionDto } from '../dtos';
import { Injectable } from '@nestjs/common';
import { omit } from 'lodash';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}
  async createPermission(dto: CreatePermissionDto) {
    console.log('dto>>>>>', dto);
    const result = await this.prisma.permission.create({
      data: {
        parentId: dto.parentId || null,
        order: dto.order || 0,
        hide: dto.hide || false,
        status: dto.status || 0,

        ...dto,
      },
    });
    console.log('result', result);
    return result;
  }
  async updatePermission(dto) {
    const { id, ...rest } = dto;
    const oldData = await this.prisma.permission.findUnique({
      where: {
        id,
      },
    });
    const data = omit(oldData, ['id', 'createdAt', 'updatedAt']);
    console.log('oldData', oldData);
    console.log('data', data);
    const result = await this.prisma.permission.update({
      where: {
        id,
      },
      data: {
        ...data,
        ...rest,
      },
    });
    return result;
  }
}
