import { join } from 'path';

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';

import { getGrpcOptions } from '@app/module-options';

import { UrlModule } from './url.module';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(UrlModule);
  const configService: ConfigService =
    appContext.get<ConfigService>(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UrlModule,
    getGrpcOptions(
      configService,
      'urlService',
      join(__dirname, '/proto/url.proto'),
    ),
  );

  await app.listen();
}
bootstrap();
