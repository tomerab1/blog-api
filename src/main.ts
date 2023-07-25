import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SerializeInterceptor } from './common/interceptors/serialize/serialize.interceptor';
import User from './user/entities/user.entity';
import { TimeoutInterceptor } from './common/interceptors/timeout/timeout.interceptor';
import { ConfigService } from '@nestjs/config';
import { GLOBAL_PREFIX } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalInterceptors(
    new SerializeInterceptor(User),
    new TimeoutInterceptor(),
  );

  app.setGlobalPrefix(GLOBAL_PREFIX);

  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
