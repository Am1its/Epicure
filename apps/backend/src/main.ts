import { config } from 'dotenv';
import { existsSync } from 'fs';
import { resolve } from 'path';

const envCandidates = [
  resolve(process.cwd(), 'apps/backend', '.env'),
  resolve(process.cwd(), '.env'),
  resolve(__dirname, '..', '.env'),
];
const envFile = envCandidates.find(p => existsSync(p));
if (envFile) config({ path: envFile });

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: process.env['CORS_ORIGIN'] ?? 'http://localhost:3000' });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
