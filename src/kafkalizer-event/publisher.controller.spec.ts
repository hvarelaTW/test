import { Test, TestingModule } from '@nestjs/testing';
import { PublisherController } from './publisher.controller';
import {
  KafkalizerModule,
  ProducerService,
  SchemaRegistryService,
} from '@yaperos/lib-nest-kafkalizer';
import { kafkalizerOptions } from './kafka-configuration';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';

describe('Publish event', () => {
  let publisherController: PublisherController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [KafkalizerModule.forRoot(kafkalizerOptions)],
      providers: [
        ProducerService,
        {
          provide: 'kafka-config',
          useExisting: ClientKafka,
          useValue: {
            emit: jest.fn().mockImplementation(
              () =>
                new Observable((observer) => {
                  observer.next('');
                  observer.complete();
                }),
            ),
          },
        },
        {
          provide: SchemaRegistryService,
          useValue: {
            encode: jest.fn(),
          },
        },
      ],
      controllers: [PublisherController],
    }).compile();

    publisherController = app.get<PublisherController>(PublisherController);
  });
  it('should produce an event of type json', async () => {
    const messageId = await publisherController.sendMessageJson();
    expect(messageId).not.toBe(null);
  });
});
