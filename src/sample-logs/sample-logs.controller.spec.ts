import { Test, TestingModule } from '@nestjs/testing';
import { SampleLogsController } from './sample-logs.controller';
import { YapeLoggerServiceMock } from '@yaperos/lib-node-log/dist/yape-logger/yape-logger.mocks';
import { REQUEST } from '@nestjs/core';

describe('SampleLogsController', () => {
  let sampleLogsController: SampleLogsController;
  const req = {
    id: '',
    raw: { headers: ['x-request-id'] },
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SampleLogsController],
      providers: [YapeLoggerServiceMock],
    })
      .overrideProvider(REQUEST)
      .useValue(req)
      .compile();

    sampleLogsController = app.get<SampleLogsController>(SampleLogsController);
  });

  describe('root', () => {
    it('should return "See you... Logs!"', async () => {
      expect(await sampleLogsController.getHello()).toBe('See you... Logs!');
    });
  });
});
