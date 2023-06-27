import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import CreatePostDto from './dtos/create-post.dto';
import { PostService } from './post.service';
import { Request } from 'express';
import UpdatePostDto from './dtos/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postsService: PostService) {}

  @Get()
  find(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.postsService.findAll(paginationQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }

  @Post()
  create(@Req() request: Request, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(request, createPostDto);
  }

  @Patch(':id')
  update(
    @Req() request: Request,
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(request, id, updatePostDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.postsService.delete(id);
  }
}
