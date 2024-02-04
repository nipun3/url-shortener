import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaService } from './prisma.service';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [UrlController],
  providers: [PrismaService, UrlService],
})
export class UrlModule {}
