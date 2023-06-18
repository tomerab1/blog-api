import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { Repository } from 'typeorm';
import CreateUserDto from './dtos/createUser.dto';
import UpdateUserDto from './dtos/updateUser.dto';

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
    if (!user) throw new NotFoundException();
    return user;
  }

  public async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) throw new NotFoundException();
    return user;
  }

  public async createUser(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  public async deleteUser(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException();
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
    await this.usersRepository.update(id, updateData);
    const updatedUser = await this.usersRepository.findOne({ where: { id } });
    if (updatedUser) return updatedUser;
    throw new NotFoundException();
  }
}
