import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

const EVENT_SOCKET_ERROR = 'error';

@Catch(WsException, HttpException)
export class WsExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: HttpException | WsException, host: ArgumentsHost) {
    this.errorHandler(exception, host);
  }

  errorHandler(exception: HttpException | WsException, host: ArgumentsHost) {
    const response = this.getPrettyResponse(exception);
    const client = host.switchToWs().getClient<Socket>();
    client.emit(EVENT_SOCKET_ERROR, response);
  }

  getPrettyResponse(exception: HttpException | WsException) {
    const prettyException = {};

    if (exception instanceof HttpException) {
      prettyException['time'] = new Date().toISOString();
      prettyException['response'] = exception.getResponse();
    } else {
      prettyException['time'] = new Date().toISOString();
      prettyException['message'] = exception.message;
    }

    return prettyException;
  }
}
