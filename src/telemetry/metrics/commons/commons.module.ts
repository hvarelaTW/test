import { DynamicModule, Module } from '@nestjs/common';
import { AppMetricLogicService } from './app-metrics-logic.service';
import {
  TelemetryConfigProvider,
  YapeMetricsServiceModule,
} from '@yaperos/lib-node-telemetry';

@Module({})
export class CommonsModule {
  static register(config?: TelemetryConfigProvider): DynamicModule {
    return {
      module: CommonsModule,
      imports: [
        YapeMetricsServiceModule.register({
          provider: config.provider,
        }),
      ],
      providers: [AppMetricLogicService],
      exports: [AppMetricLogicService],
    };
  }
}
