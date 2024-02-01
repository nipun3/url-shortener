import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { RedirectController } from './redirect.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [UrlController, RedirectController],
  providers: [PrismaService],
})
export class UrlModule {}
