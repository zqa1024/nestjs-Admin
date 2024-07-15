import { Controller, Post } from '@nestjs/common';
import { Publish } from '../common/decorators';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  @Publish()
  @Post()
  async create(): Promise<string> {
    const name = await this.redis.get('name');
    return 'This action adds a new user: ' + name;
  }
}
