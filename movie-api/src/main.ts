import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = process.env.PORT || 3000;

  const corOptions: CorsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:4200', 'https://movie-recommendation-jsap-7lxz82bon.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    maxAge: 24 * 60 * 60 * 5,
  };

  app.enableCors(corOptions);

  await app.listen(port, () => {
    console.log(`📢 Server starting on: http://localhost:${port}/ ⚡️`);
  });
}
bootstrap();
