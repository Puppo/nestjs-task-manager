import { LogLevel, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const loggerLevel: LogLevel[] =
    process.env.NODE_ENV === 'production' && !process.env.LOG_ALL
      ? ['warn', 'error']
      : undefined;
  const app = await NestFactory.create(AppModule, {
    logger: loggerLevel,
  });
  app.setGlobalPrefix('/v1/api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: false,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const PORT = parseInt(process.env.EXPOSE_PORT, 10) || 3000;
  await app.listen(PORT, () => {
    console.log(`App running on PORT:${PORT}`);
  });
}
bootstrap();
