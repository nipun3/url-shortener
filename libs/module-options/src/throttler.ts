import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerAsyncOptions, seconds } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';

export const ThrottlerModuleOptions: ThrottlerAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    throttlers: [
      {
        limit: configService.get('THROTTLER_LIMIT'),
        ttl: seconds(configService.get('THROTTLER_TTL_SECS')),
      },
    ],
    storage: new ThrottlerStorageRedisService(configService.get('REDIS_HOST')),
  }),
  inject: [ConfigService],
};
