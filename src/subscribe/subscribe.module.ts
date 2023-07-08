import { Module } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { SubscribeController } from './subscribe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscribe } from './entities/subscribe.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [SubscribeController],
  providers: [SubscribeService],
  imports: [TypeOrmModule.forFeature([Subscribe]), UserModule],
  exports: [SubscribeService],
})
export class SubscribeModule {}
