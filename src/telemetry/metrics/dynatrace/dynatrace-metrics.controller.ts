import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { YapeCountMetricInterceptor } from '@yaperos/lib-node-telemetry';
import { DynatraceMetricsService } from './dynatrace-metrics.service';

@Controller()
@UseInterceptors(YapeCountMetricInterceptor)
export class DynatraceMetricsController {
  constructor(private readonly appService: DynatraceMetricsService) {}

  @Get('dynatrace/metrics/count')
  async count() {
    return this.appService.count();
  }

  @Get('dynatrace/metrics/gauge')
  async gauge() {
    return this.appService.gauge();
  }

  @Get('dynatrace/metrics/exception-test')
  async exceptionTest() {
    throw new Error('this is a example exception :(');
  }
}
