import { TransportStreamOptions } from 'winston-transport';
import TransportStream = require('winston-transport');
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({});

interface PrismaTransportOptions extends TransportStreamOptions {
  level?: string;
}

export class PrismaTransport extends TransportStream {
  constructor(opts?: PrismaTransportOptions) {
    super(opts);
  }

  async log(info: any, callback: () => void) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    const { level, message, ...meta } = info;
    try {
      await prisma.log.create({
        data: {
          level,
          message,
          meta,
          timestamp: new Date(),
        },
      });
    } catch (error) {
      console.error('Error saving log to database', error);
    }

    callback();
  }
}
