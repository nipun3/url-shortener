import { Module } from '@nestjs/common';
import { UrlService } from './url.controller';

@Module({
  imports: [],
  controllers: [UrlService],
  providers: [],
})
export class UrlModule {}
