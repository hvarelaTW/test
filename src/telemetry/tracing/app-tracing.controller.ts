import { Controller, Get, Req, UseInterceptors } from '@nestjs/common';
import { AppTracingService } from './app-tracing.service';
import { Request } from 'express';
import {
  YapeSpan,
  YapeTraceInterceptor,
  YapeTraceService,
} from '@yaperos/lib-node-telemetry';

@Controller()
@UseInterceptors(YapeTraceInterceptor)
export class AppTracingController {
  constructor(
    private readonly appService: AppTracingService,
    private readonly yapeTraceService: YapeTraceService,
  ) {}

  @Get('tracing/example-custom-span')
  async getHello(@Req() request: Request) {
    console.log(
      `TIME: ${new Date().toLocaleTimeString()} - METHOD: ${
        request.method
      } - URL: ${request.url}`,
    );

    const span = this.yapeTraceService.startSpan('At default route'); // start new span
    span.setAttributes({ userId: 1 });

    // The attributes should be configured in the allow-list used for storing span attribute values at Dynatrace
    span.setAttribute('my-span-attr', 'DEFAULT: MY_SPAN_ATTR_VALUE');
    span.setAttribute(
      'my-other-span-attr',
      'DEFAULT: MY_OTHER_SPAN_ATTR_VALUE',
    );
    span.setAttributes({ url: request.url });
    span.setAttribute('http.method', request.method);
    await this.sleep(5000);
    span.end();

    return this.appService.getHello();
  }

  @Get('tracing/example-yape-span-with-name')
  @YapeSpan('CRITICAL_SECTION')
  async getExample() {
    await this.sleep(2000);
    return [`Example is here`];
  }

  @Get('tracing/example-yape-span')
  @YapeSpan()
  async getOtherExample() {
    await this.sleep(3000);
    return this.appService.getHello();
  }

  @Get('tracing/example-yape-trace-interceptor')
  async getExample3() {
    await this.sleep(2000);
    return [`Example 3 is here`];
  }

  private async sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
