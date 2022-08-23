import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ORM, PrismaService } from '../orm.context';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService, ORM],
})
export class UserModule {}
