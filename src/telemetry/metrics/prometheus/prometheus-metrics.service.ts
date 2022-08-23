import { Injectable } from '@nestjs/common';
import {
  MetricBuilder,
  YapeMetricsService,
  GaugeValueOperation,
} from '@yaperos/lib-node-telemetry';
import { AppMetricLogicService } from '../commons/app-metrics-logic.service';

@Injectable()
export class PrometheusMetricsService {
  constructor(
    private readonly yapeMetricsService: YapeMetricsService,
    private readonly appMetricLogicService: AppMetricLogicService,
  ) {}

  async count() {
    await this.yapeMetricsService.count(
      new MetricBuilder('AppMetricsService_countMethod', 1)
        .description('Count Metric Example')
        .dimensions('key1', 'value1')
        .dimensions('key2', 'value2')
        .dimensions('keyN', 'valueN'),
    );
    await this.yapeMetricsService.count(
      new MetricBuilder('AppMetricsService_countMethod', 1).dimensions(
        'keyN', //this key attribute, can't be different from the ln16 or ln17 or ln18
        'valueY',
      ),
    );
    await this.yapeMetricsService.count(
      new MetricBuilder('AppMetricsService_countMethod', 1),
    );
    await this.yapeMetricsService.count(
      new MetricBuilder('AppMetricsService_countMethod', 1),
    );
    return this.appMetricLogicService.count();
  }

  async gauge() {
    await this.yapeMetricsService.gauge(
      new MetricBuilder('AppMetricsService.gaugeMethod', 1)
        .description('Gauge Metric Example')
        .dimensions('measure', '1234'),
    );
    await this.yapeMetricsService.gauge(
      new MetricBuilder('AppMetricsService.gaugeMethod', 3),
    );
    await this.yapeMetricsService.gauge(
      new MetricBuilder(
        'AppMetricsService.gaugeMethod',
        4,
        GaugeValueOperation.DECREMENT,
      ),
    );
    await this.yapeMetricsService.gauge(
      new MetricBuilder(
        'AppMetricsService.gaugeMethod',
        5,
        GaugeValueOperation.INCREMENT,
      ),
    );
    return this.appMetricLogicService.gauge();
  }
}
