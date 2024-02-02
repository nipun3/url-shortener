import { join } from 'path';

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { UrlModule } from './url.module';

async function bootstrap() {
  const app = await NestFactory.create(UrlModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: `url-container:5000`,
      package: 'urlService',
      protoPath: join(__dirname, '/proto/url.proto'),
      loader: {
        keepCase: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
