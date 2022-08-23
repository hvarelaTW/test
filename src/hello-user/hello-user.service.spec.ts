import { Test } from '@nestjs/testing';
import { HelloUserService } from './hello-user.service';
import { HttpClientServiceMock } from '../common/tests/mocks/http-client.service.mocks';

describe('HelloUserService', () => {
  let helloUserService: HelloUserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [HelloUserService, HttpClientServiceMock],
    }).compile();

    helloUserService = moduleRef.get<HelloUserService>(HelloUserService);
  });

  it('should be defined', () => {
    expect(helloUserService).toBeDefined();
  });
});
