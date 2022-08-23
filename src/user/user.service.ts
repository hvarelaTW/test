import { Injectable, NotFoundException } from '@nestjs/common';
import { ORM } from '../orm.context';
import { User, UserInput } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(private orm: ORM) {}

  async create(data: UserInput): Promise<User> {
    return this.orm.user.create({
      data,
    });
  }

  async findAll(): Promise<User[]> {
    return this.orm.user.findMany();
  }

  async findOne(id: string): Promise<User | null> {
    const user: User = await this.orm.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!user) {
      throw new NotFoundException(`No user found with id ${id}`);
    }
    return user;
  }

  async update(id: string, body: UserInput): Promise<User> {
    return this.orm.user.update({ where: { id: parseInt(id) }, data: body });
  }

  async remove(id: string): Promise<User> {
    return this.orm.user.delete({ where: { id: parseInt(id) } });
  }
}
