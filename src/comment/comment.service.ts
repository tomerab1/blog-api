import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Comment from './entities/comment.entity';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/iam/iam.constants';
import { PostService } from 'src/post/post.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly userSerivce: UserService,
    private readonly postService: PostService,
  ) {}

  async findAll(paginationQuery: PaginationQueryDto) {
    return await this.commentRepository.find({
      skip: paginationQuery.offset,
      take: paginationQuery.limit,
    });
  }

  async findOne(id: number) {
    const comment = await this.commentRepository.findOne({
      where: { id },
    });

    if (!comment)
      throw new NotFoundException(`Cannot find comment with id=${id}`);
    return comment;
  }

  async create(request: Request, createCommentDto: CreateCommentDto) {
    const user = await this.userSerivce.findOne(+request[REQUEST_USER_KEY].sub);
    const post = await this.postService.findOne(createCommentDto.postId);
    const comment = await this.commentRepository.create({
      ...createCommentDto,
      author: user,
      post: post,
    });
    return await this.commentRepository.save(comment);
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.preload({
      id,
      ...updateCommentDto,
    });

    if (!comment)
      throw new NotFoundException(`Cannot find comment with id=${id}`);
    return await this.commentRepository.save(comment);
  }

  async delete(id: number) {
    const comment = await this.findOne(id);
    return await this.commentRepository.remove(comment);
  }
}
