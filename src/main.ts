import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBIT_URL],
      queue: 'education_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.listen();
}

bootstrap().then(() => {
  console.log(`Applicatin listening on port: ${process.env.APP_PORT}`);
});
