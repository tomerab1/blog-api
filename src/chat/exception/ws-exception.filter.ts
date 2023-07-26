import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

const EVENT_SOCKET_ERROR = 'error';

@Catch(WsException, HttpException)
export class WsExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: HttpException | WsException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient<Socket>();
    this.errorHandler(client, exception);
  }

  errorHandler(client: Socket, exception: HttpException | WsException) {
    const prettyException = {};

    if (exception instanceof HttpException) {
      prettyException['time'] = new Date().toISOString();
      prettyException['response'] = exception.getResponse();
    } else {
      prettyException['time'] = new Date().toISOString();
      prettyException['message'] = exception.message;
    }

    client.emit(EVENT_SOCKET_ERROR, prettyException);
  }
}
