import { NestFactory } from '@nestjs/core';
import { ShorteningServiceModule } from './shortening-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ShorteningServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `shortening-service-container:5000`,
        package: 'link',
        protoPath: join(__dirname, '/proto/shortening-service.proto')
      }

    },
  );
  await app.listen();
}
bootstrap();
