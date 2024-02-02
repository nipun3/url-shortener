import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ThrottlerModule } from '@nestjs/throttler';

import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LINK_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: `url-container:5000`,
          package: 'urlService',
          protoPath: join(__dirname, '../url/proto/url.proto'),
          loader: {
            keepCase: true,
          },
        },
      },
    ]),
    ThrottlerModule.forRoot([
      {
        ttl: 10000,
        limit: 10,
      },
    ]),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [ApiGatewayController],
  providers: [
    ApiGatewayService,
  ],
})
export class ApiGatewayModule {}
