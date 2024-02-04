import { Observable } from 'rxjs';

export interface RegisterUserDetails {
  name: string;
  email: string;
}

export interface RegisterUserResponse {
  email: string;
  apiKey: string;
  message?: string;
}

export interface UrlDetails {
  url: string;
  apiKey: string;
  email: string;
}
export interface ShortenUrlResponse {
  originalUrl: string;
  shortenedUrl: string;
  error?: string;
}

export interface ShortUrlDetails {
  shortUrlCode: string;
}

export interface OriginalUrlResponse {
  originalUrl: string;
}

export interface UrlService {
  registerUser(userDetails: RegisterUserDetails): Promise<RegisterUserResponse>;
  shortenUrl(urlDetails: UrlDetails): Promise<ShortenUrlResponse>;
  getOriginalUrl(
    shortUrlDetails: ShortUrlDetails,
  ): Observable<OriginalUrlResponse>;
}
