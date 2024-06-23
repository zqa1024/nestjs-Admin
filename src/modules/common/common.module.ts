import { Module } from '@nestjs/common';
import { CustomLoggerService } from './customLogger.service';

@Module({
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class CommonModule {}
