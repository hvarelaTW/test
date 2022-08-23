import { Module } from '@nestjs/common';
import { YapeTraceService } from '@yaperos/lib-node-telemetry';
import { AppTracingController } from './app-tracing.controller';
import { AppTracingService } from './app-tracing.service';
import { AppServiceLogic } from './app-tracing.service-logic';

@Module({
  controllers: [AppTracingController],
  providers: [AppTracingService, AppServiceLogic, YapeTraceService],
})
export class AppTracingModule {}
