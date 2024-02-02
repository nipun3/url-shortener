import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaService } from './prisma.service';
import { RedirectController } from './redirect.controller';
import { UrlController } from './url.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [UrlController, RedirectController],
  providers: [PrismaService],
})
export class UrlModule {}
