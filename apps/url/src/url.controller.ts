import { Controller, UnauthorizedException } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { nanoid } from 'nanoid';
import { v4 } from 'uuid';

import {
  Hero,
  HeroById,
  RegisterUserDetails,
  RegisterUserResponse,
  ShortenUrlResponse,
  UrlDetails,
} from '@app/proto';

import { PrismaService } from './prisma.service';

@Controller()
export class UrlController {
  constructor(private prisma: PrismaService) {}

  @GrpcMethod('UrlService', 'FindOne')
  findOne(data: HeroById): Hero {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return items.find(({ id }) => id === data.id);
  }

  @GrpcMethod('UrlService', 'RegisterUser')
  async registerUser(
    userDetails: RegisterUserDetails,
  ): Promise<RegisterUserResponse> {
    // TODO: check if user exsits already, if it does then return the api key from db

    // TODO: if user doesn't exist then, generate a api key store it in db

    return {
      api_key: v4(),
      email: userDetails.email,
    };
  }

  @GrpcMethod('UrlService', 'ShortenUrl')
  async shortenUrl(urlDetails: UrlDetails): Promise<ShortenUrlResponse> {
    // TODO: check if api_key is valid for the user, if not throw error
    const shorteningKey = nanoid(8);
    await this.prisma.user.create({
      data: {
        name: 'Rich',
        email: 'hello@prisma.com',
        posts: {
          create: {
            title: 'My first post',
            body: 'Lots of really interesting stuff',
            slug: 'my-first-post',
          },
        },
      },
    });
    const allUsers = await this.prisma.user.findMany();
    console.log('ALL USERS', allUsers);

    return {
      originalUrl: urlDetails.url,
      shortenedUrl: `http://localhost:8000/${shorteningKey}`,
    };
  }
}
