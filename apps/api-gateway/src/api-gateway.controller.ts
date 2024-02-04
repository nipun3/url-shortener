import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Response } from 'express';
import Redis from 'ioredis';
import { firstValueFrom } from 'rxjs';

import {
  RegisterUserDTO,
  RegisterUserResponse,
  ShortenUrlDTO,
  ShortenUrlResponse,
} from './api-gateway.dto';
import { ApiGatewayService } from './api-gateway.service';
import { UserThrottlerGuard } from './api-key-throttler-guard';

@Controller()
export class ApiGatewayController {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @Post('url-shortener/registerUser')
  async registerUser(
    @Body() dto: RegisterUserDTO,
  ): Promise<RegisterUserResponse> {
    return this.apiGatewayService.registerUser(dto);
  }

  @UseGuards(UserThrottlerGuard)
  @Post('url-shortener/shortenUrl')
  async shortenUrl(@Body() dto: ShortenUrlDTO): Promise<ShortenUrlResponse> {
    await this.redis.set('test', 1);
    return this.apiGatewayService.shortenUrl(dto);
  }

  @Get(':shortUrlCode')
  async redirect(
    @Res() res: Response,
    @Param('shortUrlCode') shortUrlCode: string,
  ): Promise<void> {
    // TODO: add caching here with ttl
    const link = await firstValueFrom(
      this.apiGatewayService.getOriginalUrl({ shortUrlCode }),
    );

    if (link?.originalUrl) {
      return res.redirect(HttpStatus.TEMPORARY_REDIRECT, link.originalUrl);
    }

    res.sendStatus(HttpStatus.NOT_FOUND);
  }
}
