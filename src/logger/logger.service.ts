import { Injectable } from '@nestjs/common';
import { createPath } from 'src/common/create-path.helper';
import winston, { Logger, createLogger } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  constructor(private readonly logger: Logger) {
    this.logger = createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        new DailyRotateFile({
          filename: createPath(__dirname, 'logs', 'error.log'),
          level: 'error',
        }),
        new DailyRotateFile({
          filename: createPath(__dirname, 'logs', 'combined.log'),
        }),
      ],
    });
  }
  
  debug(message: string) {
    this.logger.debug(message);
  }
  
  info(message: string) {
    this.logger.info(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }
}
