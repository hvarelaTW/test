import { Injectable } from '@nestjs/common';
import { MetricBuilder, YapeMetricsService } from '@yaperos/lib-node-telemetry';
import { AppMetricLogicService } from '../commons/app-metrics-logic.service';

@Injectable()
export class DynatraceMetricsService {
  constructor(
    private readonly yapeMetricsService: YapeMetricsService,
    private readonly appMetricLogicService: AppMetricLogicService,
  ) {}

  async count() {
    await this.yapeMetricsService.count(
      new MetricBuilder('AppMetricsService.countMethod', 1),
    );
    return this.appMetricLogicService.count();
  }

  async gauge() {
    await this.yapeMetricsService.gauge(
      new MetricBuilder('AppMetricsService.countMethod', 1),
    );
    return this.appMetricLogicService.gauge();
  }
}
