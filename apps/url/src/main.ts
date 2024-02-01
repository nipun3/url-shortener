import { NestFactory } from '@nestjs/core';
import { UrlModule } from './url.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UrlModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `url-container:5000`,
        package: 'link',
        protoPath: join(__dirname, '/proto/url.proto')
      }

    },
  );
  await app.listen();
}
bootstrap();
