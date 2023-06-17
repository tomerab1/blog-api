import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { Repository } from 'typeorm';
import CreateUserDto from './dtos/createUser.dto';
import UpdateUserDto from './dtos/updateUser.dto';
import UserNotFound from './exceptions/userNotFound.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  public async getUsers() {
    return await this.usersRepository.find();
  }

  public async getUser(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new UserNotFound(id);
    return user;
  }

  public async createUser(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  public async deleteUser(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new UserNotFound(id);
    const deleteValue = await this.usersRepository.delete(user);

    if (deleteValue.affected) {
      throw new HttpException(
        'Something went wrong...',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return user;
  }

  public async updateUser(id: number, updateData: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new UserNotFound(id);
    return await this.usersRepository.update(user, updateData);
  }
}
