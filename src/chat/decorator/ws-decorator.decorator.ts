import { UsePipes, ValidationPipe } from '@nestjs/common';

export const WsValidationPipe = () => {
  return UsePipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
};
