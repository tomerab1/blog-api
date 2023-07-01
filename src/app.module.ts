import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ImageModule } from './image/image.module';
import { DatabaseModule } from './database/database.module';
import { CommentModule } from './comment/comment.module';
import { ConfigModule } from '@nestjs/config';
import { IamModule } from './iam/iam.module';
import { PostModule } from './post/post.module';
import { EmailModule } from './email/email.module';
import { TagModule } from './tag/tag.module';
import { LoggerService } from './logger/logger.service';
import { HealthModule } from './health/health.module';
import * as Joi from 'joi';

@Module({
  imports: [
    UserModule,
    ImageModule,
    DatabaseModule,
    CommentModule,
    IamModule,
    PostModule,
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
        AWS_REGION: Joi.string().required(),
        AWS_BUCKET_NAME: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        API_ENDPOINT: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    EmailModule,
    TagModule,
    HealthModule,
  ],
  controllers: [],
  providers: [LoggerService],
})
export class AppModule {}
