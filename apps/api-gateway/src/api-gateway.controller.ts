import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import {
  RegisterUserDTO,
  RegisterUserResponse,
  ShortenUrlDTO,
  ShortenUrlResponse,
} from './api-gateway.dto';
import { ApiGatewayService } from './api-gateway.service';
import { UserThrottlerGuard } from './api-key-throttler-guard';

@Controller('url-shortener')
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Post('registerUser')
  async registerUser(
    @Body() dto: RegisterUserDTO,
  ): Promise<RegisterUserResponse> {
    return this.apiGatewayService.registerUser(dto);
  }

  @UseGuards(UserThrottlerGuard)
  @Post('shortenUrl')
  async shortenUrl(@Body() dto: ShortenUrlDTO): Promise<ShortenUrlResponse> {
    return this.apiGatewayService.shortenUrl(dto);
  }
}
