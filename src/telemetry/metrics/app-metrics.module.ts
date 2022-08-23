import { DynamicModule, Module } from '@nestjs/common';
import { PrometheusMetricsModule } from './prometheus/prometheus-metrics.module';
import { DynatraceMetricsModule } from './dynatrace/dynatrace-metrics.module';
import {
  MetricProviderOptions,
  TelemetryConfigProvider,
} from '@yaperos/lib-node-telemetry';

@Module({})
export class AppMetricsModule {
  static register(config?: TelemetryConfigProvider): DynamicModule {
    switch (config.provider) {
      case MetricProviderOptions.DYNATRACE_ONE_AGENT_METRIC_API:
        return {
          module: AppMetricsModule,
          imports: [DynatraceMetricsModule],
        };
      case MetricProviderOptions.PROMETHEUS:
      default:
        return {
          module: AppMetricsModule,
          imports: [PrometheusMetricsModule],
        };
    }
  }
}
