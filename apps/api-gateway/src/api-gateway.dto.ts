import { IsNotEmpty, IsEmail, IsUUID, IsUrl } from 'class-validator';

export class RegisterUserDTO {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}

export class RegisterUserResponse {
  email: string;
  apiKey: string;
}

export class ShortenUrlDTO {
  @IsNotEmpty()
  @IsUrl({}, { message: 'Invalid url format!' })
  url: string;

  @IsNotEmpty()
  @IsUUID()
  apiKey: string;
}

export class ShortenUrlResponse {
  originalUrl: string;
  shortenedUrl: string;
}
