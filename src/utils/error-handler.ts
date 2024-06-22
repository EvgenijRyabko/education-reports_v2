import { ERROR_HANDLER, LOGGER } from '@common/constants';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { ICustomLogger } from './logger';

type CustomRpcException = {
  message: string;
  statusCode: number;
};

export interface IErrorHandler {
  badRequest400(error: string): Promise<RpcException>;

  internalError500(error: string): Promise<RpcException>;
}

@Injectable()
export class ErrorHandler implements IErrorHandler {
  constructor(@Inject(LOGGER) private readonly logger: ICustomLogger) {}

  async badRequest400(error: string): Promise<RpcException> {
    await this.logger.error(error);

    throw new RpcException(<CustomRpcException>{
      statusCode: HttpStatus.BAD_REQUEST,
      message: error,
    });
  }

  async internalError500(error: string): Promise<RpcException> {
    await this.logger.error(error);

    throw new RpcException(<CustomRpcException>{
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: error,
    });
  }
}

export const ErrorHelper = {
  provide: ERROR_HANDLER,
  useClass: ErrorHandler,
};
