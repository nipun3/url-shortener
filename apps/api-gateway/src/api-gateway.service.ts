import { Hero, UrlService } from '@app/proto';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';


@Injectable()
export class ApiGatewayService implements OnModuleInit {
  private urlService: UrlService;

  constructor(@Inject('LINK_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.urlService = this.client.getService<UrlService>('UrlService');
  }

  getHello(): Promise<Hero> {
    return this.urlService.findOne({ id: 1 });
  }
}
