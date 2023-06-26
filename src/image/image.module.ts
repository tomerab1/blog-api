import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Image from './entities/image.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [ImageController],
  providers: [ImageService, ConfigService],
  exports: [ImageService],
  imports: [
    TypeOrmModule.forFeature([Image]),
    MulterModule.register(),
    ConfigModule,
  ],
})
export class ImageModule {}
