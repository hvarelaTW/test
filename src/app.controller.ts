import { Controller, Get, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AppService } from './app.service';
import { RequestLogInfo, YapeLoggerService } from '@yaperos/lib-node-log';
import { validateHeaders } from './common/utils/validate-headers';

@Controller()
export class AppController {
  private readonly requestLogInfo: RequestLogInfo;

  constructor(
    @Inject(REQUEST) private request,
    private logger: YapeLoggerService,
    private readonly appService: AppService,
  ) {
    this.requestLogInfo = validateHeaders(
      request,
      AppController.name,
      this.getHello.name,
      'MS-NEST-TEMPLATE',
      'APP-CONTROLLER',
    );
  }

  @Get()
  async getHello(): Promise<string> {
    this.logger.log('Calling service hello...', this.requestLogInfo);
    return this.appService.getHello();
  }
}
