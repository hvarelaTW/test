import { Module } from '@nestjs/common';
import { SampleLogsController } from './sample-logs.controller';

@Module({
  imports: [],
  controllers: [SampleLogsController],
  providers: [],
})
export class SampleLogsModule {}
