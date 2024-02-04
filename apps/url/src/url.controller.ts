import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import {
  RegisterUserDetails,
  RegisterUserResponse,
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
}
