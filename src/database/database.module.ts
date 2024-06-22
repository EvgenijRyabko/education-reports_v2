import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';

@Module({
  imports: [
    KnexModule.forRootAsync({
      useFactory: () => ({
        config: {
          client: 'pg',
          useNullAsDefault: true,
          version: '5.7',
          connection: {
            host: process.env.PG_HOST,
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DATABASE,
          },
          pool: {
            min: 0,
            max: 100,
          },
          searchPath: ['education', 'pers'],
          acquireConnectionTimeout: 10000,
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
