import { LOGGER } from '@common/constants';
import { Injectable } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';

const currDate = new Date().toISOString().split('.')[0];

export interface ICustomLogger {
  log(message: string, optionalParam?: any): Promise<void>;

  error(message: string, optionalParam?: any): Promise<void>;
}

@Injectable()
class CustomLogger implements ICustomLogger {
  private readonly winstonFileLogger = createLogger({
    level: 'info',
    format: format.combine(format.simple()),
    transports: [
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'combined.log' }),
    ],
  });

  public async log(message: string, optionalParam?: any) {
    this.winstonFileLogger
      .info(`${currDate} - ${message}`)
      .child(() => optionalParam || null);
  }

  public async error(message: string, optionalParam?: any) {
    this.winstonFileLogger
      .error(`${currDate} - ${message}`)
      .child(() => optionalParam || null);
  }
}

export const LoggerService = {
  provide: LOGGER,
  useClass: CustomLogger,
};
