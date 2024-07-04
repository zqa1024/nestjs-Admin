import { CustomPrismaClientFactory } from 'nestjs-prisma';
import { ExtendedPrismaClient, extendedPrismaClient } from './prisma.extension';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExtendedPrismaConfigService
  implements CustomPrismaClientFactory<ExtendedPrismaClient>
{
  constructor() {}

  createPrismaClient(): ExtendedPrismaClient {
    return extendedPrismaClient;
  }
}
