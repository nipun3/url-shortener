import { IsNotEmpty, IsEmail, IsUUID, IsUrl } from 'class-validator';

export class RegisterUserDTO {
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'Invalid email format.' })
  email: string;
}

export class RegisterUserResponse {
  email: string;
  apiKey: string;
  message?: string;
}

export class ShortenUrlDTO {
  @IsNotEmpty()
  @IsUrl(
    { require_protocol: true },
    { message: 'Invalid url format! Make sure url has a valid protocol & domain length.' },
  )
  url: string;

  @IsNotEmpty()
  @IsUUID('4', { message: 'Invalid api key.' })
  apiKey: string;

  @IsEmail({}, { message: 'Invalid email format.' })
  email: string;
}

export class ShortenUrlResponse {
  originalUrl: string;
  shortenedUrl: string;
}
