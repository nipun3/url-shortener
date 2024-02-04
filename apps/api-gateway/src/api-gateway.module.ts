import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { ThrottlerModule } from '@nestjs/throttler';
import { RedisModule } from '@nestjs-modules/ioredis';

import {
  GrpcClientModuleOptions,
  RedisModuleOptions,
  ThrottlerModuleOptions,
} from '@app/module-options';

import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';

@Module({
  imports: [
    ClientsModule.registerAsync(
      GrpcClientModuleOptions(
        'GRPC_CLIENT',
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
