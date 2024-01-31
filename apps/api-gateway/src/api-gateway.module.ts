import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

console.log('process.env.HOST_IP', process.env.HOST_IP);

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LINK_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: `shortening-service-container:5000`,
          package: 'link',
          protoPath: join(__dirname, '../shortening-service/proto/shortening-service.proto')
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}