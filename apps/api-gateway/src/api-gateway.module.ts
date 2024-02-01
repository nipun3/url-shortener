import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LINK_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: `url-container:5000`,
          package: 'link',
          protoPath: join(__dirname, '../url/proto/url.proto'),
          loader: {
            keepCase: true,
          },
        },
      },
    ]),
    ThrottlerModule.forRoot([{
      ttl: 10000,
      limit: 2,
    }]),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService,
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard
    // }
  ],
})
export class ApiGatewayModule {}
