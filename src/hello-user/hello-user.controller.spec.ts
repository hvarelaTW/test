import { Test } from '@nestjs/testing';
import { HelloUserController } from './hello-user.controller';
import { HelloUserService } from './hello-user.service';
import { HttpClientServiceMock } from '../common/tests/mocks/http-client.service.mocks';
import { YapeLoggerServiceMock } from '@yaperos/lib-node-log/dist/yape-logger/yape-logger.mocks';
import { REQUEST } from '@nestjs/core';

describe('HelloUserController', () => {
  let helloUserController: HelloUserController;
  const req = {
    id: '',
    raw: {
      headers: ['x-request-id'],
    },
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HelloUserController],
      providers: [
        HelloUserService,
        HttpClientServiceMock,
        YapeLoggerServiceMock,
      ],
    })
      .overrideProvider(REQUEST)
      .useValue(req)
      .compile();

    helloUserController =
      moduleRef.get<HelloUserController>(HelloUserController);
  });

  it('should be defined', () => {
    expect(helloUserController).toBeDefined();
  });
});
