import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.AUTH_PORT;
  if (!port) {
    throw new Error('PORT environment variable is not defined');
    process.exit(1);
  }
  await app.listen(port);
}
bootstrap();
