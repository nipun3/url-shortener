import { join } from 'path';

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';

import { UrlModule } from './url.module';
import { getGrpcOptions } from '@app/module-options';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(UrlModule);
  const configService: ConfigService = app.get<ConfigService>(ConfigService);

  app.connectMicroservice<MicroserviceOptions>(
    getGrpcOptions(
      configService,
      'urlService',
      join(__dirname, '/proto/url.proto'),
    ),
  );

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
