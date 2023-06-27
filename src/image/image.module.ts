import { Logger, Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Image from './entities/image.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { S3Client } from '@aws-sdk/client-s3';
import { UserModule } from 'src/user/user.module';
import { PostModule } from 'src/post/post.module';

@Module({
  controllers: [ImageController],
  providers: [
    ImageService,
    {
      provide: S3Client,
      useFactory: async (configService: ConfigService) => {
        Logger.debug(`[!] Initializing S3Client...`);
        return new S3Client({
          region: configService.get('AWS_REGION'),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [ImageService],
  imports: [
    TypeOrmModule.forFeature([Image]),
    MulterModule.register(),
    ConfigModule,
    UserModule,
    PostModule,
  ],
})
export class ImageModule {}
