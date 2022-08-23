import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YapeLoggerServiceMock } from '@yaperos/lib-node-log/dist/yape-logger/yape-logger.mocks';
import { REQUEST } from '@nestjs/core';

describe('AppController', () => {
  let appController: AppController;
  const req = {
    id: '',
    raw: {
      headers: ['x-request-id'],
    },
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, YapeLoggerServiceMock],
    })
      .overrideProvider(REQUEST)
      .useValue(req)
      .compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      expect(await appController.getHello()).toBe('Hello World!');
    });
  });
});
