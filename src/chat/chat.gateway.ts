import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import {
  EVENT_CREATE_CHAT_ROOM,
  EVENT_DELETE_CHAT_ROOM,
  EVENT_FIND_CHAT_ROOM_ALL,
  EVENT_FIND_CHAT_ROOM_ONE,
  EVENT_RECV_MESSAGE,
} from './chat.events';
import { CreateMessageDto } from './dto/create-message.dto';
import { Socket } from 'socket.io';
import { FindChatDto } from './dto/find-chat.dto';
import { DeleteChatDto } from './dto/delete-chat.dto';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage(EVENT_CREATE_CHAT_ROOM)
  create(
    @ConnectedSocket() client: Socket,
    @MessageBody() createChatDto: CreateChatDto,
  ) {
    return this.chatService.createRoom(client, createChatDto);
  }

  @SubscribeMessage(EVENT_RECV_MESSAGE)
  recvMessage(
    @ConnectedSocket()
    client: Socket,
    @MessageBody() createMessageDto: CreateMessageDto,
  ) {
    return this.chatService.addMessage(client, createMessageDto);
  }

  @SubscribeMessage(EVENT_FIND_CHAT_ROOM_ALL)
  async findAll(@ConnectedSocket() client: Socket) {
    const allRooms = await this.chatService.findAllRooms(client);
    client.emit(EVENT_FIND_CHAT_ROOM_ALL, allRooms);
  }

  @SubscribeMessage(EVENT_FIND_CHAT_ROOM_ONE)
  async findOne(
    @ConnectedSocket() client: Socket,
    @MessageBody() findChatDto: FindChatDto,
  ) {
    const oneRoom = await this.chatService.findOneRoom(client, findChatDto.id);
    client.emit(EVENT_FIND_CHAT_ROOM_ALL, oneRoom);
  }

  @SubscribeMessage(EVENT_DELETE_CHAT_ROOM)
  remove(
    @ConnectedSocket() client: Socket,
    @MessageBody() deleteChatDto: DeleteChatDto,
  ) {
    this.chatService.removeRoom(client, deleteChatDto.id);
    client.emit(
      EVENT_DELETE_CHAT_ROOM,
      `Chat with id=${deleteChatDto.id} was deleted`,
    );
  }
}
