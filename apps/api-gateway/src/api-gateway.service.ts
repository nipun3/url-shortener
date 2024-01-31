import { Hero, ShorteningService } from '@app/proto';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';


@Injectable()
export class ApiGatewayService implements OnModuleInit {
  private shorteningService: any;

  constructor(@Inject('LINK_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.shorteningService = this.client.getService<ShorteningService>('ShorteningService');
  }

  getHello(): Promise<Hero> {
    return this.shorteningService.findOne({ id: 1 });
  }
}
