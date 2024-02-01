// user-id-throttler.guard.ts
import { ThrottlerGenerateKeyFunction, ThrottlerGetTrackerFunction, ThrottlerGuard, ThrottlerOptions } from '@nestjs/throttler';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class UserThrottlerGuard extends ThrottlerGuard {
    getTracker(req) {
    console.log('%capi-key-throttler-guard.ts line:8 req', 'color: #007acc;', req.body.api_key);
    return req.body.api_key;
  }
}
