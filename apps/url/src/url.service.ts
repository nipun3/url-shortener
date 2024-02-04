import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { nanoid } from 'nanoid';
import { v4 } from 'uuid';

import { log } from '@app/logger';
import {
  OriginalUrlResponse,
  RegisterUserDetails,
  RegisterUserResponse,
  ShortUrlDetails,
  ShortenUrlResponse,
  UrlDetails,
} from '@app/proto';

import { PrismaService } from './prisma.service';

@Injectable()
export class UrlService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  /**
   * registers a user and returns an api key
   *
   * @param userDetails - user details
   * @returns {Promise<RegisterUserResponse>}
   */
  async registerUser(
    userDetails: RegisterUserDetails,
  ): Promise<RegisterUserResponse> {
    const { email, name } = userDetails;
    try {
      const user = await this.prisma.user.findFirst({
        select: { apiKey: true },
        where: { email },
      });

      if (user)
        return {
          apiKey: user.apiKey,
          email,
          message: 'User already registered!',
        };

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
      log('urlService#registerUser unkwown error occurred', error);
    }
  }

  /**
   * accepts a long url, emailId & api key, returns a short url
   *
   * @param urlDetails - url details
   * @returns {Promise<ShortenUrlResponse>}
   */
  async shortenUrl(urlDetails: UrlDetails): Promise<ShortenUrlResponse> {
    try {
      const { apiKey, url: originalUrl, email } = urlDetails;
      const baseUrl = this.configService.get('API_GATEWAY_LB');

      const [user, links] = await Promise.all([
        this.prisma.user.findFirst({
          where: { apiKey, email },
          select: { id: true },
        }),
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
      if (links.length > 0) existingShortUrlCode = links[0]?.shortUrlCode;

      const shortUrlCode = existingShortUrlCode ?? nanoid(11);

      await this.prisma.link.create({
        data: {
          originalUrl,
          shortUrlCode,
          apiKey,
        },
      });

      return {
        originalUrl,
        shortenedUrl: `${baseUrl}/${shortUrlCode}`,
      };
    } catch (error) {
      log('urlService#shortenUrl unkwown error occurred', error);
    }
  }

  /**
   * fetches the orginal url
   *
   * @param shortUrlDetails - short url details
   * @returns {Promise<OriginalUrlResponse>}
   */
  async getOriginalUrl(
    shortUrlDetails: ShortUrlDetails,
  ): Promise<OriginalUrlResponse> {
    try {
      const { shortUrlCode } = shortUrlDetails;
      const link = await this.prisma.link.findFirst({
        where: { shortUrlCode },
        select: { originalUrl: true },
      });

      return link;
    } catch (error) {
      log('urlService#getOriginalUrl unkwown error occurred', error);
    }
  }
}
