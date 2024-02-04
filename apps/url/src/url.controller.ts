import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { log } from '@app/logger';
import {
  OriginalUrlResponse,
  RegisterUserDetails,
  RegisterUserResponse,
  ShortUrlDetails,
  ShortenUrlResponse,
  UrlDetails,
} from '@app/proto';

import { UrlService } from './url.service';

// TODO: move relevant code to url service
@Controller()
export class UrlController {
  constructor(private urlService: UrlService) {}

  @GrpcMethod('UrlService', 'RegisterUser')
  async registerUser(
    userDetails: RegisterUserDetails,
  ): Promise<RegisterUserResponse> {
    log('USER REGISTER ENDPOINT!');
    return this.urlService.registerUser(userDetails);
  }

  /**
   * shortens a url given a long url
   * @param urlDetails details of the url to shorten
   * @returns {Promise<ShortenUrlResponse>} shortened url
   */
  @GrpcMethod('UrlService', 'ShortenUrl')
  async shortenUrl(urlDetails: UrlDetails): Promise<ShortenUrlResponse> {
    return this.urlService.shortenUrl(urlDetails);
  }

  @GrpcMethod('UrlService', 'GetOriginalUrl')
  async getOriginalUrl(
    shortUrlDetails: ShortUrlDetails,
  ): Promise<OriginalUrlResponse> {
    log('USER REGISTER ENDPOINT11!');
    return this.urlService.getOriginalUrl(shortUrlDetails);
  }
}
