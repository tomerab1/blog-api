import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Image from './entities/image.entity';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [ImageController],
  providers: [ImageService, ConfigService],
  imports: [TypeOrmModule.forFeature([Image]), MulterModule.register()],
})
export class ImageModule {}
