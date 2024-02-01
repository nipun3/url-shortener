import { Body, Controller, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';

import {
  RegisterUserDTO,
  RegisterUserResponse,
  ShortenUrlDTO,
  ShortenUrlResponse,
} from './api-gateway.dto';
import { ApiGatewayService } from './api-gateway.service';

@Controller('url-shortener')
export class ApiGatewayController {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    private configService: ConfigService
  ) { }

  // @Get()
  // getHello(): Promise<Hero> {
  //   return this.apiGatewayService.getHello();
  // }

  @Post('registerUser')
  async registerUser(
    @Body() dto: RegisterUserDTO,
  ): Promise<RegisterUserResponse> {
    return this.apiGatewayService.registerUser(dto);
  }

  @Post('shortenUrl')
  async shortenUrl(@Body() dto: ShortenUrlDTO): Promise<ShortenUrlResponse> {
    try {
      const testValue = this.configService.get('test');
      console.log('%capi-gateway.controller.ts line:36 testValue', 'color: #007acc;', testValue);

      return this.apiGatewayService.shortenUrl(dto);
    } catch (error) {
      throw new RpcException(error.response);
    }
  }
}
