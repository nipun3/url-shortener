import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerAsyncOptions, seconds } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';

export const ThrottlerModuleOptions: ThrottlerAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    // TODO: configure below via env variables
    throttlers: [{ limit: 5, ttl: seconds(10) }],
    storage: new ThrottlerStorageRedisService(configService.get('REDIS_HOST')),
  }),
  inject: [ConfigService],
};
