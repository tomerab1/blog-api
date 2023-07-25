import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { ChatMessage } from './entities/message.entity';
import { UserService } from 'src/user/user.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { AuthTokenService } from 'src/iam/websocket-auth/authToken.service';
import { Socket } from 'socket.io';
import { REQUEST_USER_KEY } from 'src/iam/iam.constants';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    @InjectRepository(ChatMessage)
    private readonly chatMessagesRepository: Repository<ChatMessage>,
    private readonly userService: UserService,
    private readonly authTokenService: AuthTokenService,
  ) {}

  getAuthenticatedUser(client: Socket) {
    return this.authTokenService.verify(client);
  }

  async createRoom(client: Socket, createChatDto: CreateChatDto) {
    try {
      if (!this.getAuthenticatedUser(client))
        throw new WsException('Unauthorized');

      console.log(client);

      const sender = await this.userService.findOne(
        client[REQUEST_USER_KEY].sub,
      );
      const recipient = await this.userService.findOne(createChatDto.recipient);

      const room = this.chatRepository.create({
        users: [sender, recipient],
        messages: new Array<ChatMessage>(),
      });

      const savedChat = await this.chatRepository.save(room);
      return savedChat;
    } catch (error) {
      throw error;
    }
  }

  async addMessage(client: Socket, createMessageDto: CreateMessageDto) {
    try {
      if (!this.getAuthenticatedUser(client))
        throw new WsException('Unauthorized');

      const room = await this.chatRepository.findOne({
        where: { id: createMessageDto.room },
        relations: { messages: true },
      });

      const sender = await this.userService.findOne(
        client[REQUEST_USER_KEY].sub,
      );

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

  async findAllRooms() {
    return await this.chatRepository.find();
  }

  findOneRoom(id: number) {
    return `This action returns a #${id} chat`;
  }

  removeRoom(id: number) {
    return `This action removes a #${id} chat`;
  }
}
