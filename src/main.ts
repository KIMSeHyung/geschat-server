import { NestFactory } from '@nestjs/core';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './chat/chat.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      store: MongoStore.create({ mongoUrl: process.env.MONGO_HOST }),
      saveUninitialized: false,
    }),
  );
  app.useWebSocketAdapter(new RedisIoAdapter(app));
  await app.listen(3000);
}
bootstrap();
