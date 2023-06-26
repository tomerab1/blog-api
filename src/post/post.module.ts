import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageModule } from 'src/image/image.module';
import { UserModule } from 'src/user/user.module';
import Post from './entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), ImageModule, UserModule],
  exports: [],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
