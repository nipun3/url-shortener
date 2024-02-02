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

      const [user, link] = await Promise.all([
        this.prisma.user.findFirst({
          where: { apiKey },
          select: { id: true },
        }),
        this.prisma.link.findFirst({
          where: { originalUrl },
          select: { shortUrlCode: true },
        }),
      ]);

      if (!user) {
        return {
          originalUrl: null,
          shortenedUrl: null,
          error: 'Unregistered user!',
        };
      }

      if (link) {
        return {
          originalUrl,
          shortenedUrl: `${baseUrl}/${link.shortUrlCode}`,
        };
      }

      const shortUrlCode = nanoid(10);
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
