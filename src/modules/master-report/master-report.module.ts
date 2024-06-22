import { Module } from '@nestjs/common';

import { MasterReportController } from './master-report.controller';

@Module({
  controllers: [MasterReportController],
  providers: [],
})
export class MasterReportModule {}
