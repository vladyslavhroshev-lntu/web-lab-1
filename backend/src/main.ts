import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Дозволяємо CORS для взаємодії з клієнтом (React + Vite)
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`🚀 Бекенд успішно запущено: http://localhost:${port}`);
  logger.log(`📦 Endpoint items: http://localhost:${port}/items`);
}
bootstrap();
