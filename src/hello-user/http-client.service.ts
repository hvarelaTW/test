import { Injectable } from '@nestjs/common';
import got from 'got';
import { ErrorResponseException } from '../common/exceptions/response-exception';

@Injectable()
export class HttpClientService {
  get(url: string) {
    return got
      .get(url, { responseType: 'json' })
      .then((res) => {
        return res.body;
      })
      .catch((err) => {
        throw new ErrorResponseException(err.message);
      });
  }
}
