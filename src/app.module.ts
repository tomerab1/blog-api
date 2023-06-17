import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GalleryModule } from './gallery/gallery.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { CommenteryModule } from './commentery/commentery.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './file/file.module';
import { IamModule } from './iam/iam.module';
import Joi from 'joi';

@Module({
  imports: [
    UserModule,
    GalleryModule,
    AuthModule,
    DatabaseModule,
    CommenteryModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    FileModule,
    IamModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
