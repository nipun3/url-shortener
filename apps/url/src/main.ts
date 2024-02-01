import { NestFactory } from '@nestjs/core';
import { UrlModule } from './url.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(UrlModule);

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.GRPC,
      options: {
        url: `url-container:5000`,
        package: 'link',
        protoPath: join(__dirname, '/proto/url.proto'),
        loader: {
          keepCase: true,
        },
      }

    },
  );

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
