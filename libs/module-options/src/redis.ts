import { RedisModuleAsyncOptions } from "@nestjs-modules/ioredis";
import { ConfigModule, ConfigService } from "@nestjs/config";

export const RedisModuleOptions: RedisModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      type: 'single',
      url: configService.get('REDIS_URL'),
    }),
    inject: [ConfigService],
  }