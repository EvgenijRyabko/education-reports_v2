import { REDIS_CONNECTION } from '@common/constants';
import Redis from 'ioredis';

export const RedisConnection = {
  provide: REDIS_CONNECTION,
  useFactory: () =>
    new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
    }),
};
