import { Injectable } from '@nestjs/common';
import { ErrorResponseException } from '../common/exceptions/response-exception';
import { HttpClientService } from './http-client.service';

@Injectable()
export class HelloUserService {
  private readonly URL_REST_GOT = 'https://jsonplaceholder.typicode.com/users';

  constructor(private readonly httpClientService: HttpClientService) {}

  getHelloUser() {
    const hello = [];
    return this.httpClientService
      .get(this.URL_REST_GOT)
      .then((r: []) => {
        if (0 !== r?.length) {
          r.forEach((e) => {
            hello.push(e);
          });
        } else {
          const msg = 'Bye World!';
          hello.push(msg);
        }

        return hello;
      })
      .catch((err) => {
        throw new ErrorResponseException(err.message);
      });
  }
}
