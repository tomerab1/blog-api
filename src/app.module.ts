import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GalleryModule } from './gallery/gallery.module';
import { DatabaseModule } from './database/database.module';
import { CommentaryModule } from './commentary/commentary.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './file/file.module';
import { IamModule } from './iam/iam.module';
import * as Joi from 'joi';

@Module({
  imports: [
    UserModule,
    GalleryModule,
    DatabaseModule,
    CommentaryModule,
    FileModule,
    IamModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_TOKEN_AUDIENCE: Joi.string().required(),
        JWT_TOKEN_ISSUER: Joi.string().required(),
        JWT_ACCESS_TOKEN_TTL: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
