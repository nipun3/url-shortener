export interface RegisterUserDetails {
  name: string;
  email: string;
}

export interface RegisterUserResponse {
  email: string;
  apiKey: string;
}

export interface UrlDetails {
  url: string;
  apiKey: string;
}
export interface ShortenUrlResponse {
  originalUrl: string;
  shortenedUrl: string;
  error?: string;
}

export interface UrlService {
  registerUser(userDetails: RegisterUserDetails): Promise<RegisterUserResponse>;
  shortenUrl(urlDetails): Promise<ShortenUrlResponse>;
}
