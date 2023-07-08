import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { Repository } from 'typeorm';
import CreateUserDto from './dtos/create-user.dto';
import UpdateUserDto from './dtos/update-user.dto';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  public async findAll(paginationDto: PaginationQueryDto) {
    const { limit, offset } = paginationDto;
    return await this.usersRepository.find({
      skip: offset,
      take: limit,
    });
  }

  public async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { posts: true, images: true, subscribers: true },
    });
    if (!user) throw new NotFoundException();
    return user;
  }

  public async findOneEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException();
    return user;
  }

  public async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  public async delete(id: number) {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }

  public async update(id: number, updateData: UpdateUserDto) {
    const user = await this.usersRepository.preload({
      id,
      ...updateData,
    });
    if (!user) throw new NotFoundException();
    return this.usersRepository.save(user);
  }
}
