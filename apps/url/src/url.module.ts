import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { RedirectController } from './redirect.controller';

@Module({
  imports: [],
  controllers: [UrlController, RedirectController],
  providers: [],
})
export class UrlModule {}
