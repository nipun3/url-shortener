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

@Controller()
export class UrlController {
  constructor(private urlService: UrlService) {}

  /**
   * method to register a user
   * @param userDetails - details of the user to register
   * @returns {Promise<RegisterUserResponse>}
   */
  @GrpcMethod('UrlService', 'RegisterUser')
  async registerUser(
    userDetails: RegisterUserDetails,
  ): Promise<RegisterUserResponse> {
    return this.urlService.registerUser(userDetails);
  }

  /**
   * shortens a url given a long url
   * 
   * @param urlDetails details of the url to shorten
   * @returns {Promise<ShortenUrlResponse>} shortened url
   */
  @GrpcMethod('UrlService', 'ShortenUrl')
  async shortenUrl(urlDetails: UrlDetails): Promise<ShortenUrlResponse> {
    return this.urlService.shortenUrl(urlDetails);
  }

  /**
   * fetches the long ur for the given short url code
   * 
   * @param shortUrlDetails - short url details
   * @returns {Promise<OriginalUrlResponse>}
   */
  @GrpcMethod('UrlService', 'GetOriginalUrl')
  async getOriginalUrl(
    shortUrlDetails: ShortUrlDetails,
  ): Promise<OriginalUrlResponse> {
    return this.urlService.getOriginalUrl(shortUrlDetails);
  }
}
