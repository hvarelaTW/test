import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}

@Injectable()
class ORM {
  constructor(private service: PrismaService) {}

  get user() {
    return this.service.user;
  }
}

export { ORM };
export const orm = new ORM(new PrismaService());
