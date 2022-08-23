import { Module } from '@nestjs/common';
import { HelloUserService } from './hello-user.service';
import { HelloUserController } from './hello-user.controller';
import { HttpClientService } from './http-client.service';

@Module({
  imports: [],
  controllers: [HelloUserController],
  providers: [HelloUserService, HttpClientService],
})
export class HelloUserModule {}
