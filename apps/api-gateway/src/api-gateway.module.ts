import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { ThrottlerModule } from '@nestjs/throttler';
import { RedisModule } from '@nestjs-modules/ioredis';

import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import {
  GrpcClientModuleOptions,
  RedisModuleOptions,
  ThrottlerModuleOptions,
} from '@app/module-options';

@Module({
  imports: [
    ClientsModule.registerAsync(
      GrpcClientModuleOptions(
        'LINK_PACKAGE',
        'urlService',
        join(__dirname, '../url/proto/url.proto'),
      ),
    ),
    ThrottlerModule.forRootAsync(ThrottlerModuleOptions),
    RedisModule.forRootAsync(RedisModuleOptions),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
