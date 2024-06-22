import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';

import { MasterReportModule } from './master-report/master-report.module';
import { SharedModule } from './shared.module';

@Module({
  imports: [
    //? Global scope modules
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    SharedModule,

    //? API modules
    MasterReportModule,
  ],
})
export class AppModule {}
