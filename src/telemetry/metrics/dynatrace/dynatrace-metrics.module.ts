import { Module } from '@nestjs/common';
import { DynatraceMetricsService } from './dynatrace-metrics.service';
import { DynatraceMetricsController } from './dynatrace-metrics.controller';
import {
  YapeMetricsServiceModule,
  MetricProviderOptions,
} from '@yaperos/lib-node-telemetry';
import { CommonsModule } from '../commons/commons.module';

@Module({
  imports: [
    YapeMetricsServiceModule.register({
      provider: MetricProviderOptions.DYNATRACE_ONE_AGENT_METRIC_API,
    }),
    CommonsModule.register({
      provider: MetricProviderOptions.DYNATRACE_ONE_AGENT_METRIC_API,
    }),
  ],
  providers: [DynatraceMetricsService],
  controllers: [DynatraceMetricsController],
})
export class DynatraceMetricsModule {}
