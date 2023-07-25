import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
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

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage(EVENT_CREATE_CHAT_ROOM)
  create(@MessageBody() createChatDto: CreateChatDto) {
    return this.chatService.createRoom(createChatDto);
  }

  @SubscribeMessage(EVENT_FIND_CHAT_ROOM_ALL)
  findAll() {
    return this.chatService.findAllRooms();
  }

  @SubscribeMessage(EVENT_FIND_CHAT_ROOM_ONE)
  findOne(@MessageBody() id: number) {
    return this.chatService.findOneRoom(id);
  }

  @SubscribeMessage(EVENT_RECV_MESSAGE)
  recvMessage(@MessageBody() createMessageDto: CreateMessageDto) {
    return this.chatService.addMessage(createMessageDto);
  }

  @SubscribeMessage(EVENT_DELETE_CHAT_ROOM)
  remove(@MessageBody() id: number) {
    return this.chatService.removeRoom(id);
  }
}
