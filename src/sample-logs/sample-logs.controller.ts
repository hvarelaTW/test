import { Controller, Get, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { RequestLogInfo, YapeLoggerService } from '@yaperos/lib-node-log';
import { validateHeaders } from '../common/utils/validate-headers';

@Controller('sample-logs')
export class SampleLogsController {
  private readonly requestLogInfo: RequestLogInfo;

  constructor(
    @Inject(REQUEST) private request,
    private logger: YapeLoggerService,
  ) {
    this.requestLogInfo = validateHeaders(
      request,
      SampleLogsController.name,
      this.getHello.name,
      'MS-NEST-TEMPLATE',
      'SAMPLE-LOGS-CONTROLLER',
    );
  }

  @Get()
  async getHello() {
    this.logger.log('Hello', this.requestLogInfo);
    this.logger.debug('debugging', this.requestLogInfo);
    this.logger.error('error', this.requestLogInfo);
    this.logger.warn('warning', this.requestLogInfo);
    this.logger.verbose('verbose', this.requestLogInfo);
    return 'See you... Logs!';
  }
}
