import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import {
  RegisterUserDetails,
  UrlService,
  RegisterUserResponse,
  UrlDetails,
  ShortenUrlResponse,
  ShortUrlDetails,
  OriginalUrlResponse,
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
    const res = await this.urlService.registerUser(userDetails);
    return res;
  }

  async shortenUrl(urlDetails: UrlDetails): Promise<ShortenUrlResponse> {
    return this.urlService.shortenUrl(urlDetails);
  }

  getOriginalUrl(
    shortUrlDetails: ShortUrlDetails,
  ): Observable<OriginalUrlResponse> {
    return this.urlService.getOriginalUrl(shortUrlDetails);
  }
}
