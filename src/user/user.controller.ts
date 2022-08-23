import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { User, UserInput } from './interfaces/user.interface';
import { UserService } from './user.service';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { RequestLogInfo, YapeLoggerService } from '@yaperos/lib-node-log';
import { validateHeaders } from '../common/utils/validate-headers';

@UseFilters(HttpExceptionFilter)
@Controller('user')
export class UserController {
  private readonly requestLogInfo: RequestLogInfo;

  constructor(
    @Inject(REQUEST) private request,
    private logger: YapeLoggerService,
    private readonly userService: UserService,
  ) {
    this.requestLogInfo = validateHeaders(
      request,
      UserController.name,
      'CRUD-USERS',
      'MS-NEST-TEMPLATE',
      'USER-CONTROLLER',
    );
  }

  @Post()
  async create(
    @Body() userData: { name?: string; email: string },
  ): Promise<User> {
    this.logger.log('User Controller create', this.requestLogInfo);
    return this.userService.create(userData);
  }

  @Get()
  findAll() {
    this.logger.log('User Controller findAll', this.requestLogInfo);
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    this.logger.log('User Controller findOne', this.requestLogInfo);
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UserInput) {
    this.logger.log('User Controller update', this.requestLogInfo);
    return this.userService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log('User Controller remove', this.requestLogInfo);
    return this.userService.remove(id);
  }
}
