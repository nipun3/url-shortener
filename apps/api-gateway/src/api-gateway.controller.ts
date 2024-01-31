import { Controller, Get } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { Hero } from '@app/proto';


@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Get()
  getHello(): Promise<Hero> {
    return this.apiGatewayService.getHello();
  }
}
