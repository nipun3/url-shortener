export interface Hero {
  id: number;
  name: string;
}

export interface HeroById {
  id: number;
}

export interface RegisterUserDetails {
  name: string;
  email: string;
}

export interface RegisterUserResponse {
  email: string;
  api_key: string;
}

export interface UrlDetails {
  url: string;
  api_key: string;
  email: string;
}
export interface ShortenUrlResponse {
  originalUrl: string;
  shortenedUrl: string;
}

export interface UrlService {
  findOne(request: HeroById): Promise<Hero>;
  registerUser(userDetails: RegisterUserDetails): Promise<RegisterUserResponse>;
  shortenUrl(urlDetails): Promise<ShortenUrlResponse>;
}