import { Injectable } from '@nestjs/common';
import { YapeSpan } from '@yaperos/lib-node-telemetry';

@Injectable()
export class AppServiceLogic {
  @YapeSpan()
  async getHello() {
    await this.sleep(4000);
    return 'Hello World!';
  }

  private async sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
