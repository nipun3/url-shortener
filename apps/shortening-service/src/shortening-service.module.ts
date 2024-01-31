import { Module } from '@nestjs/common';
import { ShorteningService } from './shortening-service.controller';

@Module({
  imports: [],
  controllers: [ShorteningService],
  providers: [],
})
export class ShorteningServiceModule {}
