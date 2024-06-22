import { RedisConnection } from '@database/redis-connection';
import { Global, Module } from '@nestjs/common';
import { ErrorHelper } from '@utils/error-handler';
import { LoggerService } from '@utils/logger';

@Global()
@Module({
  providers: [RedisConnection, LoggerService, ErrorHelper],
  exports: [RedisConnection, LoggerService, ErrorHelper],
})
export class SharedModule {}
