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
import { HealthModule } from './health/health.module';
import { SubscribeModule } from './subscribe/subscribe.module';
import { LoggerModule } from './logger/logger.module';
import { SearchModule } from './search/search.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { PaymentsModule } from './payments/payments.module';
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
    SubscribeModule,
    LoggerModule,
    SearchModule,
    SchedulerModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
