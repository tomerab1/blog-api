import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
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
  async findAll(@ConnectedSocket() socket: Socket) {
    const allRooms = await this.chatService.findAllRooms();
    return socket.emit(EVENT_FIND_CHAT_ROOM_ALL, allRooms);
  }

  @SubscribeMessage(EVENT_FIND_CHAT_ROOM_ONE)
  findOne(@MessageBody() id: number) {
    return this.chatService.findOneRoom(id);
  }

  @SubscribeMessage(EVENT_DELETE_CHAT_ROOM)
  remove(@MessageBody() id: number) {
    return this.chatService.removeRoom(id);
  }
}
