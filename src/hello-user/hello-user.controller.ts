import { Controller, Get, Inject, UseFilters } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { HelloUserService } from './hello-user.service';
import { RequestLogInfo, YapeLoggerService } from '@yaperos/lib-node-log';
import { validateHeaders } from '../common/utils/validate-headers';

@UseFilters(HttpExceptionFilter)
@Controller('rest-got')
export class HelloUserController {
  private readonly requestLogInfo: RequestLogInfo;

  constructor(
    @Inject(REQUEST) private request,
    private logger: YapeLoggerService,
    private readonly helloUserService: HelloUserService,
  ) {
    this.requestLogInfo = validateHeaders(
      request,
      HelloUserController.name,
      this.getHelloUser.name,
      'MS-NEST-TEMPLATE',
      'HELLO-USER-CONTROLLER',
    );
  }

  @Get()
  getHelloUser(): Promise<any> {
    this.logger.log('Calling service HelloUser', this.requestLogInfo);
    return this.helloUserService.getHelloUser();
  }
}
