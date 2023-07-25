import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { ChatMessage } from './entities/message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    @InjectRepository(ChatMessage)
    private readonly chatMessagesRepository: Repository<ChatMessage>,
  ) {}

  createRoom(createChatDto: CreateChatDto) {
    return 'This action adds a new chat';
  }

  addMessage() {}

  findAllRooms() {
    return `This action returns all chat`;
  }

  findOneRoom(id: number) {
    return `This action returns a #${id} chat`;
  }

  removeRoom(id: number) {
    return `This action removes a #${id} chat`;
  }
}
