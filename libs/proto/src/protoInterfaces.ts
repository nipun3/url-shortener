export interface Hero {
  id: number;
  name: string;
}

export interface HeroById {
  id: number;
}

export interface UrlService {
  findOne(request: HeroById): Promise<Hero>;
}
