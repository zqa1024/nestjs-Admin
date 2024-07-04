import { Prisma, PrismaClient } from '@prisma/client';

export const extendedPrismaClient = new PrismaClient().$extends({
  model: {
    $allModels: {
      async findAndCount<T, A>(
        this: T,
        args: Prisma.Args<T, 'findMany'>,
      ): Promise<{
        list: Prisma.Result<T, Prisma.Args<T, 'findMany'>, 'findMany'>;
        total: number;
      }> {
        const context: any = Prisma.getExtensionContext(this);

        const list = await context.findMany(args);
        const total = await context.count({ where: args.where });
        return {
          list,
          total,
        };
      },
    },
  },
});

export type ExtendedPrismaClient = typeof extendedPrismaClient;
