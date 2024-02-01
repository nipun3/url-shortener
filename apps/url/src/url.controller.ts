import { Hero, HeroById, RegisterUserDetails, RegisterUserResponse, ShortenUrlResponse, UrlDetails } from '@app/proto';
import { Controller, UnauthorizedException } from '@nestjs/common';
import { v4 } from 'uuid';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { nanoid } from 'nanoid';

@Controller()
export class UrlController {
  @GrpcMethod('UrlService', 'FindOne')
  findOne(data: HeroById): Hero {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return items.find(({ id }) => id === data.id);
  }

  @GrpcMethod('UrlService', 'RegisterUser')
  async registerUser(userDetails: RegisterUserDetails): Promise<RegisterUserResponse> {
    // TODO: check if user exsits already, if it does then return the api key from db

    // TODO: if user doesn't exist then, generate a api key store it in db 

    return {
      api_key: v4(),
      email: userDetails.email,
   }
  }

  @GrpcMethod('UrlService', 'ShortenUrl')
  async shortenUrl(urlDetails: UrlDetails): Promise<ShortenUrlResponse> {
    // TODO: check if api_key is valid for the user, if not throw error
    const shorteningKey = nanoid(8);


    return {
      originalUrl: urlDetails.url,
      shortenedUrl: `http://localhost:8000/${shorteningKey}`,
    }
  }
}
