import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

global.__basedir = __dirname;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: true } });
  await app.listen(3000);
}
bootstrap();
