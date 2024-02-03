import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcMethod } from '@nestjs/microservices';
import { nanoid } from 'nanoid';
import { v4 } from 'uuid';

import { log } from '@app/logger';
import {
  RegisterUserDetails,
  RegisterUserResponse,
  ShortenUrlResponse,
  UrlDetails,
} from '@app/proto';

import { PrismaService } from './prisma.service';

// TODO: move relevant code to url service
@Controller()
export class UrlController {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  @GrpcMethod('UrlService', 'RegisterUser')
  async registerUser(
    userDetails: RegisterUserDetails,
  ): Promise<RegisterUserResponse> {
    const { email, name } = userDetails;
    try {
      const user = await this.prisma.user.findFirst({
        select: { apiKey: true },
        where: { email },
      });

      if (user) return { apiKey: user.apiKey, email };

      const apiKey = v4();
      await this.prisma.user.create({
        data: {
          name,
          email,
          apiKey,
        },
      });

      return {
        apiKey,
        email,
      };
    } catch (error) {
      log('urlController#registerUser unkwown error occurred', error);
    }
  }

  @GrpcMethod('UrlService', 'ShortenUrl')
  async shortenUrl(urlDetails: UrlDetails): Promise<ShortenUrlResponse> {
    try {
      const { apiKey, url: originalUrl } = urlDetails;
      const baseUrl = this.configService.get('URL_SERVICE_HTTP_HOST');

      const [user, links] = await Promise.all([
        this.prisma.user.findFirst({
          where: { apiKey },
          select: { id: true },
        }),
        // consider pagination here so as to not load too many records in memory
        this.prisma.link.findMany({
          where: { originalUrl },
          select: { shortUrlCode: true, apiKey: true },
        }),
      ]);

      if (!user) {
        return {
          originalUrl: null,
          shortenedUrl: null,
          error: 'Unregistered user!',
        };
      }

      // short url already exists for this user
      const linkCurrentUser = links.find((link) => link.apiKey === apiKey);
      if (linkCurrentUser) {
        return {
          originalUrl,
          shortenedUrl: `${baseUrl}/${linkCurrentUser.shortUrlCode}`,
        };
      }

      /**
       * At a rate of generation of 1000 short url codes per hr, nanoid(11) will take
       * ~139 years or 1 Billion ids, in order to have a 1% probability of at least one collision.
       * source: https://zelark.github.io/nano-id-cc/
       *
       * if short url code already exists for a different user, don't generate a new code
       * create a new record with the same short url code for the current user
       */
      let existingShortUrlCode: string | undefined;
      // take top one, all will have the same code
      if (links.length > 0) existingShortUrlCode = links[0]?.shortUrlCode; 

      const shortUrlCode = existingShortUrlCode ?? nanoid(11);

      await this.prisma.link.create({
        data: {
          originalUrl,
          shortUrlCode,
          apiKey,
          // TODO: handle expiry
          expiryAt: new Date(),
        },
      });

      return {
        originalUrl,
        shortenedUrl: `${baseUrl}/${shortUrlCode}`,
      };
    } catch (error) {
      log('urlController#shortenUrl unkwown error occurred', error);
    }
  }
}
