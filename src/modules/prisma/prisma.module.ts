import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CustomPrismaModule, PrismaModule } from 'nestjs-prisma';
import { ExtendedPrismaConfigService } from './extends-prisma-config';

@Global()
@Module({
  imports: [
    PrismaModule.forRootAsync({
      isGlobal: true,
      useClass: PrismaService,
    }),
    // PrismaModule,
    CustomPrismaModule.forRootAsync({
      name: 'CustomPrisma',
      isGlobal: true,
      useClass: ExtendedPrismaConfigService,
    }),
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModules {}
