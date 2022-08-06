import { NestFactory } from '@nestjs/core';
import { FileModule } from './modules/file/file.module';

async function bootstrap() {
  const app = await NestFactory.create(FileModule);
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
