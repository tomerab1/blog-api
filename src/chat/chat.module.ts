import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { ChatMessage } from './entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, ChatMessage])],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
