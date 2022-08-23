import {
  ENCODING,
  JSON_ENCODING,
  Message,
  ProducerService,
} from '@yaperos/lib-nest-kafkalizer';
import { Controller, Get } from '@nestjs/common';

@Controller('produce-event')
export class PublisherController {
  constructor(private producer: ProducerService) {}

  @Get('proto-format')
  async sendProtoMessage() {
    const HEADERS = {
      'x-request-id': '123456789',
      'x-correlation-id': '999123456789',
    };

    const topicName = 'movement-history';
    const movementHistory = {
      amount: 15,
    };
    const message = new Message(topicName, HEADERS, movementHistory);
    return this.producer.publishMessage(message);
  }

  @Get('json-format')
  async sendMessageJson() {
    const HEADERS = {
      [ENCODING]: JSON_ENCODING,
    };

    const topicName = 'user';
    const movementHistory = {
      idNumber: 15,
      birthday: '2012-04-21',
    };
    const message = new Message(topicName, HEADERS, movementHistory);
    return this.producer.publishMessage(message);
  }
}
