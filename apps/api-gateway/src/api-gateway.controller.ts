import { Body, Controller, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { RegisterUserDTO, RegisterUserResponse, ShortenUrlDTO, ShortenUrlResponse } from './api-gateway.dto';
import { RpcException } from '@nestjs/microservices';


@Controller('url-shortener')
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  // @Get()
  // getHello(): Promise<Hero> {
  //   return this.apiGatewayService.getHello();
  // }

  @Post('registerUser')
  async registerUser(@Body() dto: RegisterUserDTO): Promise<RegisterUserResponse> {
    return this.apiGatewayService.registerUser(dto);
  }

  @Post('shortenUrl')
  async shortenUrl(@Body() dto: ShortenUrlDTO): Promise<ShortenUrlResponse> {
    try{
      return this.apiGatewayService.shortenUrl(dto);
    } catch (error) {
      throw new RpcException(error.response);
    }
  }
}
