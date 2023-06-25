import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Image from './entities/image.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ImageController],
  providers: [ImageService, ConfigService],
  imports: [
    TypeOrmModule.forFeature([Image]),
    MulterModule.register(),
    UserModule,
    ConfigModule,
  ],
})
export class ImageModule {}
