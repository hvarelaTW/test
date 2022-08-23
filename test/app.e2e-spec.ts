import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

let app: NestFastifyApplication;

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication(new FastifyAdapter());
  await app.init();
});

describe('REST', () => {
  it('/ (GET)', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/',
    });
    expect(res.body).toBe('Hello World!');
    expect(res.statusCode).toBe(200);
  });
});
