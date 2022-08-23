import { Injectable } from '@nestjs/common';
import { YapeSpan } from '@yaperos/lib-node-telemetry';
import { AppServiceLogic } from './app-tracing.service-logic';

@Injectable()
export class AppTracingService {
  constructor(private readonly appServiceLogic: AppServiceLogic) {}

  @YapeSpan()
  async getHello() {
    await this.sleep(3000);
    return this.appServiceLogic.getHello();
  }

  private async sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
