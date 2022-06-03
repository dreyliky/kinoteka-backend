import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

global.__basedir = __dirname;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: { origin: true } });
    await app.listen(3000);
}
bootstrap();

process.on('uncaughtException', (error, origin) => {
    console.log('----- Uncaught exception -----');
    console.log(error);
    console.log('----- Exception origin -----');
    console.log(origin);
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('----- Unhandled Rejection at -----');
    console.log(promise);
    console.log('----- Reason -----');
    console.log(reason);
});
