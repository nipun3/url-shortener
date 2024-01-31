export interface Hero {
  id: number;
  name: string;
}

export interface HeroById {
  id: number;
}

export interface ShorteningService {
  findOne(request: HeroById): Promise<Hero>;
}
