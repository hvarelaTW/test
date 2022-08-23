import * as grpc from '@grpc/grpc-js';
import { Metadata } from '@grpc/grpc-js';
import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { HeroById } from './interfaces/hero-by-id.interface';
import { Hero } from './interfaces/hero.interface';
import { RequestLogInfo, YapeLoggerService } from '@yaperos/lib-node-log';
import { REQUEST } from '@nestjs/core';
import { validateHeadersGrpc } from '../common/utils/validate-headers';

@Controller('hero')
export class HeroController {
  private readonly requestLogInfo: RequestLogInfo;

  constructor(
    @Inject(REQUEST) private request,
    private logger: YapeLoggerService,
  ) {
    this.requestLogInfo = validateHeadersGrpc(
      request,
      HeroController.name,
      this.findOne.name,
      'MS-NEST-TEMPLATE',
      'HERO-CONTROLLER',
    );
  }

  private readonly items: Hero[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];

  @GrpcMethod('HeroService')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findOne(data: HeroById, metadata: Metadata): Promise<Hero> {
    this.logger.log('Hero Service FindOne', this.requestLogInfo);
    const hero = this.items.find(({ id }) => id === data.id);
    if (!hero) {
      // https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: `The requested entity (Hero with id: ${data.id}) was not found.`,
      });
    }
    return hero;
  }
}
