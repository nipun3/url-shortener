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
  @IsUrl(
    { require_protocol: true },
    { message: 'Invalid url format! Make sure url has a valid protocol.' },
  )
  url: string;

  @IsNotEmpty()
  @IsUUID()
  apiKey: string;
}

export class ShortenUrlResponse {
  originalUrl: string;
  shortenedUrl: string;
}
