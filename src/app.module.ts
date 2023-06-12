import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GalleryModule } from './gallery/gallery.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { CommenteryModule } from './commentery/commentery.module';

@Module({
  imports: [UserModule, GalleryModule, AuthModule, DatabaseModule, CommenteryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
