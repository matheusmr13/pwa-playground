import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const { PORT = 8080 } = process.env;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
