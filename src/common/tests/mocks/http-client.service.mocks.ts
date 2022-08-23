import { HttpClientService } from '../../../hello-user/http-client.service';

export const HttpClientServiceMock = {
  provide: HttpClientService,
  useValue: {
    get: jest.fn(),
  },
};
