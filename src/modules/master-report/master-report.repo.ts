import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

export interface IMasterReportRepo {}

@Injectable()
export class MasterReportRepo {
  constructor(@InjectConnection() private readonly knex: Knex) {}
}
