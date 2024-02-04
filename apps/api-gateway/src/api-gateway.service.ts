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

@Injectable()
export class ApiGatewayService implements OnModuleInit {
  private urlService: UrlService;

  constructor(@Inject('GRPC_CLIENT') private grpcClient: ClientGrpc) {}

  onModuleInit() {
    this.urlService = this.grpcClient.getService<UrlService>('UrlService');
  }

  /**
   * registers a user and returns an api key
   * 
   * @param userDetails - user details
   * @returns {Promise<RegisterUserResponse>}
   */
  async registerUser(
    userDetails: RegisterUserDetails,
  ): Promise<RegisterUserResponse> {
    const res = await this.urlService.registerUser(userDetails);
    return res;
  }

  /**
   * accepts a long url, emailId & api key, returns a short url
   * 
   * @param urlDetails - url details
   * @returns {Promise<ShortenUrlResponse>}
   */
  async shortenUrl(urlDetails: UrlDetails): Promise<ShortenUrlResponse> {
    return this.urlService.shortenUrl(urlDetails);
  }

  /**
   * fetches the orginal url
   * 
   * @param shortUrlDetails - short url details
   * @returns {Observable<OriginalUrlResponse>}
   */
  getOriginalUrl(
    shortUrlDetails: ShortUrlDetails,
  ): Observable<OriginalUrlResponse> {
    return this.urlService.getOriginalUrl(shortUrlDetails);
  }
}
