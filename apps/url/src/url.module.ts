import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { RedirectController } from './redirect.controller';
import { UrlController } from './url.controller';

@Module({
  imports: [],
  controllers: [UrlController, RedirectController],
  providers: [PrismaService],
})
export class UrlModule {}
