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
import { ConfigService } from '@nestjs/config';

@Controller()
export class ApiGatewayController {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly apiGatewayService: ApiGatewayService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * endpoint that registers a user and returns an api key
   * 
   * @param registerUserDTO - request data for user registration
   * @returns {Promise<RegisterUserResponse>}
   */
  @Post('url-shortener/registerUser')
  async registerUser(
    @Body() registerUserDTO: RegisterUserDTO,
  ): Promise<RegisterUserResponse> {
    return this.apiGatewayService.registerUser(registerUserDTO);
  }

  /**
   * accepts a long url, emailId & api key, returns a short url
   * 
   * @param shortenUrlDTO - request data for shortening url
   * @returns {Promise<ShortenUrlResponse>}
   */
  @UseGuards(UserThrottlerGuard)
  @Post('url-shortener/shortenUrl')
  async shortenUrl(@Body() shortenUrlDTO: ShortenUrlDTO): Promise<ShortenUrlResponse> {
    return this.apiGatewayService.shortenUrl(shortenUrlDTO);
  }

  /**
   * gets the long url from cache or db for the provided short url code & redirects the user
   * 
   * @param res - express response object
   * @param shortUrlCode 
   * @returns {Promise<void>}
   */
  @Get(':shortUrlCode')
  async redirect(
    @Res() res: Response,
    @Param('shortUrlCode') shortUrlCode: string,
  ): Promise<void> {
    let originalUrl: string | null;

    originalUrl = await this.redis.get(shortUrlCode);

    if (!originalUrl) {
      const link = await firstValueFrom(
        this.apiGatewayService.getOriginalUrl({ shortUrlCode }),
      );
      originalUrl = link?.originalUrl;

      await this.redis.setex(
        shortUrlCode,
        this.configService.get('URL_CACHE_EXPIRY_SECS'),
        originalUrl,
      );
    }

    if (originalUrl) {
      return res.redirect(HttpStatus.TEMPORARY_REDIRECT, originalUrl);
    }

    res.sendStatus(HttpStatus.NOT_FOUND);
  }
}
