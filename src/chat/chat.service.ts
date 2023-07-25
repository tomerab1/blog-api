import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { ChatMessage } from './entities/message.entity';
import { UserService } from 'src/user/user.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    @InjectRepository(ChatMessage)
    private readonly chatMessagesRepository: Repository<ChatMessage>,
    private readonly userService: UserService,
  ) {}

  async createRoom(createChatDto: CreateChatDto) {
    try {
      const sender = await this.userService.findOne(createChatDto.sender);
      const recipient = await this.userService.findOne(createChatDto.recipient);

      const room = this.chatRepository.create({
        users: [sender, recipient],
        messages: new Array<ChatMessage>(),
      });

      const savedChat = await this.chatRepository.save(room);
      console.log(savedChat);
      return savedChat;
    } catch (error) {
      throw error;
    }
  }

  async addMessage(createMessageDto: CreateMessageDto) {
    try {
      const room = await this.chatRepository.findOne({
        where: { id: createMessageDto.room },
        relations: { messages: true },
      });

      const message = await this.chatMessagesRepository.create({
        content: createMessageDto.text,
        chat: room,
      });

      const savedMessage = await this.chatMessagesRepository.save(message);

      room.messages.push(message);
      await this.chatRepository.save(room);

      return savedMessage;
    } catch (error) {
      throw error;
    }
  }

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
