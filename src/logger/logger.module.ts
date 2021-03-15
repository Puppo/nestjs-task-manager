import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/request.middleware';

@Module({
  providers: [Logger],
  exports: [Logger],
})
export class LoggerModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
