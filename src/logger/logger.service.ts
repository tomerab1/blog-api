import { Injectable } from '@nestjs/common';
import { createPath } from 'src/common/create-path.helper';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.json(),
      level: 'info',
      transports: [
        new winston.transports.DailyRotateFile({
          dirname: 'logs',
          filename: createPath(__dirname, '%DATE%-error.log'),
          level: 'error',
          zippedArchive: true,
        }),
        new winston.transports.DailyRotateFile({
          dirname: 'logs',
          filename: createPath(__dirname, '%DATE%-combined.log'),
          level: 'info',
          zippedArchive: true,
        }),
      ],
    });
  }

  debug = (message: string) => {
    this.logger.debug(message);
  };

  info = (message: string) => {
    this.logger.info(message);
  };

  error = (message: string) => {
    this.logger.error(message);
  };

  warn = (message: string) => {
    this.logger.warn(message);
  };
}
