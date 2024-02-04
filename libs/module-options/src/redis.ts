import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModuleAsyncOptions } from '@nestjs-modules/ioredis';

export const RedisModuleOptions: RedisModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'single',
    url: configService.get('REDIS_HOST'),
  }),
  inject: [ConfigService],
};
