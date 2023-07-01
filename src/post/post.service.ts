import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Post from './entities/post.entity';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { Repository } from 'typeorm';
import CreatePostDto from './dtos/create-post.dto';
import UpdatePostDto from './dtos/update-post.dto';
import { UserService } from 'src/user/user.service';
import { REQUEST_USER_KEY } from 'src/iam/iam.constants';
import { Request } from 'express';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    private readonly userSerivce: UserService,
  ) {}

  async findAll({ offset, limit }: PaginationQueryDto) {
    return await this.postRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: { images: true, tags: true },
    });

    if (!post) throw new NotFoundException(`Cannot find post with id=${id}`);
    return post;
  }

  async create(request: Request, createPostDto: CreatePostDto) {
    const user = await this.userSerivce.findOne(request[REQUEST_USER_KEY].sub);
    const post = await this.postRepository.create({
      ...createPostDto,
      user,
    });
    return await this.postRepository.save(post);
  }

  async update(request: Request, id: number, updatePostDto: UpdatePostDto) {
    const user = await this.userSerivce.findOne(request[REQUEST_USER_KEY].sub);
    const post = await this.postRepository.preload({
      id,
      ...updatePostDto,
      user,
    });

    if (!post) throw new NotFoundException(`Cannot find post with id=${id}`);
    return this.postRepository.save(post);
  }

  async delete(id: number) {
    const post = await this.findOne(id);
    return this.postRepository.remove(post);
  }
}
