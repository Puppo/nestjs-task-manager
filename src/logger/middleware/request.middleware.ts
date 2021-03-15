import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {
    this.logger.setContext(LoggerMiddleware.name);
  }

  use(req: Request, res: Response, next: () => void): void {
    const startTime = new Date();
    const url = `${req.method}:${req.baseUrl}${req.url}`;
    this.logger.log(`REQUEST ${url} start time: ${startTime.toISOString()}`);

    res.on('finish', () => {
      const endTime = new Date();
      this.logger.log(
        `RESPONSE ${url} ends in ${
          endTime.getTime() - startTime.getTime()
        }ms: end time: ${endTime.toISOString()}`,
      );
    });
    next();
  }
}
