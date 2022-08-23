import { Controller } from '@nestjs/common';
import {
  DecodedMessage,
  YapeEvent,
  YapeEventPattern,
} from '@yaperos/lib-nest-kafkalizer';
import { YapeEventError } from '@yaperos/lib-nest-kafkalizer/dist/kafkalizer.interface';

@Controller()
export class ConsumerController {
  @YapeEventPattern('user')
  async getJsonExample(event: YapeEvent) {
    const decodedMessage: DecodedMessage = await event.getMsgAsJSON();
    console.log(
      `Decode Event Message: ${JSON.stringify(decodedMessage.message)}`,
    );
    console.log(`Decode Event Error: ${decodedMessage.error?.message}`);
  }

  @YapeEventPattern('movement-history')
  async getErrorExample(event: YapeEvent) {
    const customHeader = { 'id-number': 'Error decoding' };
    console.log(event.headers);
    //Generating a handled error. It will be sent to the DLQ
    throw new YapeEventError('The idNumber can not be 0', customHeader);
  }
}
