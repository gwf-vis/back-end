import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: /^(http|https):\/\/localhost*/,
    credentials: true,
  });
  await app.listen(5000, '0.0.0.0');
}
bootstrap();
