import { IsDate, IsIn, IsNotEmpty, IsEmail, IsOptional, IsString, IsUUID, IsUrl } from 'class-validator';

export class RegisterUserDTO {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;
}
  
export class RegisterUserResponse {
    email: string;
    api_key: string;
}

export class ShortenUrlDTO {
    @IsNotEmpty()
    @IsUrl({}, {message: 'Invalid url format!'})
    url: string;

    @IsNotEmpty()
    @IsUUID()
    api_key: string;

    @IsNotEmpty()
    @IsEmail()
    email: string
}

export class ShortenUrlResponse {
    originalUrl: string;
    shortenedUrl: string;
}
