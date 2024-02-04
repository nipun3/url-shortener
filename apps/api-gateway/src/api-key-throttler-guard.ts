import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request } from 'express';

/**
 * Custom throttler guard. Throttles based on user's api key
 */
@Injectable()
export class UserThrottlerGuard extends ThrottlerGuard {
  getTracker(req: Request) {
    return req?.body?.apiKey;
  }
}
