import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { YapeCountMetricInterceptor } from '@yaperos/lib-node-telemetry';
import { PrometheusMetricsService } from './prometheus-metrics.service';

@Controller()
@UseInterceptors(YapeCountMetricInterceptor)
export class PrometheusMetricsController {
  constructor(private readonly appService: PrometheusMetricsService) {}

  @Get('prometheus/metrics/count')
  async count() {
    return this.appService.count();
  }

  @Get('prometheus/metrics/gauge')
  async gauge() {
    return this.appService.gauge();
  }

  @Get('prometheus/metrics/exception-test')
  async exceptionTest() {
    throw new Error('this is a example exception :(');
  }
}
