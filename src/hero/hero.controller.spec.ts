import { Metadata } from '@grpc/grpc-js';
import { Test, TestingModule } from '@nestjs/testing';
import { HeroController } from './hero.controller';
import { REQUEST } from '@nestjs/core';
import { YapeLoggerServiceMock } from '@yaperos/lib-node-log/dist/yape-logger/yape-logger.mocks';
import { IdentificationHeader } from '@yaperos/lib-node-log';

describe('HeroController', () => {
  let heroController: HeroController;
  const req = {
    id: '',
    context: new Metadata(),
  };
  req.context.set(
    IdentificationHeader.REQUEST_ID,
    '560a8451-a29c-41d4-a716-544676554400',
  );

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [YapeLoggerServiceMock],
      controllers: [HeroController],
    })
      .overrideProvider(REQUEST)
      .useValue(req)
      .compile();

    heroController = app.get<HeroController>(HeroController);
  });

  describe('findOne', () => {
    it('should return an object with Id 1', async () => {
      const foundObject = await heroController.findOne(
        { id: 1 },
        new Metadata(),
      );
      expect(foundObject.id).toBe(1);
      expect(foundObject.name).toBe('John');
    });
  });
});
