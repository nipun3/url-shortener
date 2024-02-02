import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ThrottlerModule, seconds } from '@nestjs/throttler';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';

import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { GrpcClientModuleOptions, RedisModuleOptions, ThrottlerModuleOptions } from '@app/module-options';

@Module({
  imports: [
    ClientsModule.registerAsync(GrpcClientModuleOptions(join(__dirname, '../url/proto/url.proto'))),
    ThrottlerModule.forRootAsync(ThrottlerModuleOptions),
    RedisModule.forRootAsync(RedisModuleOptions),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
