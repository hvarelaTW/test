import { Injectable } from '@nestjs/common';
import { YapeCount, YapeGauge } from '@yaperos/lib-node-telemetry';

@Injectable()
export class AppMetricLogicService {
  @YapeCount('AppMetricLogicService.countMethod', 1)
  async count() {
    return 'Hello World!';
  }

  @YapeGauge('AppMetricLogicService.gaugeMethod', 1)
  async gauge() {
    return 'Hello World!';
  }
}
