import { Test, TestingModule } from '@nestjs/testing';
import { AppTracingController } from './app-tracing.controller';
import { AppTracingService } from './app-tracing.service';
import { Request } from 'express';
import { YapeTraceService } from '@yaperos/lib-node-telemetry';
import { AppServiceLogic } from './app-tracing.service-logic';

jest.setTimeout(18000);

describe('AppTracingController Test', () => {
  let appController: AppTracingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppTracingController],
      providers: [AppTracingService, YapeTraceService, AppServiceLogic],
    }).compile();

    appController = app.get<AppTracingController>(AppTracingController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const mockRequest: Request = {
        method: 'GET',
        url: '/',
      };
      expect(await appController.getHello(mockRequest)).toBe('Hello World!');
    });
  });
});
