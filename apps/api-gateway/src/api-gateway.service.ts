import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  RegisterUserDetails,
  UrlService,
  RegisterUserResponse,
  UrlDetails,
  ShortenUrlResponse,
} from '@app/proto';

// TODO: add doc strings everywhere
@Injectable()
export class ApiGatewayService implements OnModuleInit {
  private urlService: UrlService;

  constructor(@Inject('GRPC_CLIENT') private grpcClient: ClientGrpc) {}

  onModuleInit() {
    this.urlService = this.grpcClient.getService<UrlService>('UrlService');
  }

  async registerUser(
    userDetails: RegisterUserDetails,
  ): Promise<RegisterUserResponse> {
    return this.urlService.registerUser(userDetails);
  }

  async shortenUrl(urlDetails: UrlDetails): Promise<ShortenUrlResponse> {
    try {
      return this.urlService.shortenUrl(urlDetails);
    } catch (error) {
      console.log(error);
    }
  }
}
