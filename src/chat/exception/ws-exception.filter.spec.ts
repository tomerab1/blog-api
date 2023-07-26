import { WsExceptionFilter } from './ws-exception.filter';

describe('ExceptionFilter', () => {
  it('should be defined', () => {
    expect(new WsExceptionFilter()).toBeDefined();
  });
});
