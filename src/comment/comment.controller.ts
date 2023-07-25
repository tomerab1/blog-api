import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { Request } from 'express';
import { UpdateCommentDto } from './dtos/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  findAll(paginationQuery: PaginationQueryDto) {
    return this.commentService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commentService.findOne(id);
  }

  @Post()
  create(@Req() request: Request, @Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(request, createCommentDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.commentService.delete(id);
  }
}
