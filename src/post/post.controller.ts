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
import { ImageService } from 'src/image/image.service';
import AttachImageDto from 'src/post/dtos/attach-image.dto';
import { Request } from 'express';
import UpdatePostDto from './dtos/update-post.dto';

@Controller('post')
export class PostController {
  constructor(
    private readonly postsService: PostService,
    private readonly imageService: ImageService,
  ) {}

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

  @Post('/:id/add-image')
  addImage(@Param('id') id: number, @Body() attachImageDto: AttachImageDto) {
    // get the post.
    // find the image base of its key.
    // update the post with the image.
    return this.postsService.addImage(id, attachImageDto);
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
