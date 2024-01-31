import { Hero, HeroById } from '@app/proto';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';


@Controller()
export class ShorteningService {
  @GrpcMethod('ShorteningService', 'FindOne')

  findOne(data: HeroById): Hero {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return items.find(({ id }) => id === data.id);
  }
}
