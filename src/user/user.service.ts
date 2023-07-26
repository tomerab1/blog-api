import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { Repository } from 'typeorm';
import CreateUserDto from './dtos/create-user.dto';
import UpdateUserDto from './dtos/update-user.dto';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import SearchUserService from 'src/search/services/search-user.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly userSearchService: SearchUserService,
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
      relations: {
        posts: true,
        images: true,
        subscribers: true,
        subscriptions: true,
        chats: true,
        messages: true,
      },
    });
    if (!user) throw new NotFoundException();
    return user;
  }

  public async searchUser(text: string) {
    return await this.userSearchService.searchDocument(text);
  }

  public async findOneEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException();
    return user;
  }

  public async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    this.userSearchService.indexEntity(newUser.id.toString(), newUser);
    return newUser;
  }

  public async delete(id: number) {
    const user = await this.findOne(id);
    this.userSearchService.deleteDocument(id.toString());
    return await this.usersRepository.remove(user);
  }

  async updateUser(id: number, updateData: User) {
    const user = await this.usersRepository.preload({ id, ...updateData });
    if (!user) throw new NotFoundException();
    this.userSearchService.updateEntity(user);
    return await this.usersRepository.save(user);
  }

  public async update(id: number, updateData: UpdateUserDto) {
    const user = await this.usersRepository.preload({
      id,
      ...updateData,
    });
    if (!user) throw new NotFoundException();
    this.userSearchService.updateEntity(user);
    return await this.usersRepository.save(user);
  }
}
