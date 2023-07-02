import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  consturctor() {}

  use(req: any, res: any, next: () => void) {
    next();
  }
}
