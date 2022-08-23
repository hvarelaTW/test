import { Test, TestingModule } from '@nestjs/testing';
import { ORM, PrismaService } from '../orm.context';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { YapeLoggerServiceMock } from '@yaperos/lib-node-log/dist/yape-logger/yape-logger.mocks';
import { REQUEST } from '@nestjs/core';

describe('UserController', () => {
  let controller: UserController;
  const req = {
    id: '',
    raw: {
      headers: ['x-request-id'],
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, ORM, PrismaService, YapeLoggerServiceMock],
    })
      .overrideProvider(REQUEST)
      .useValue(req)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
