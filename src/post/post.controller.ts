import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import CreatePostDto from './dtos/create-post.dto';
import { PostService } from './post.service';
import { ImageService } from 'src/image/image.service';
import AttachImageDto from 'src/image/dtos/attach-image.dto';

@Controller('post')
export class PostController {
  constructor(
    private readonly postsService: PostService,
    private readonly imageService: ImageService,
  ) {}

  @Get()
  find(@Query() paginationQueryDto: PaginationQueryDto) {}

  @Get(':id')
  findOne(@Param('id') id: number) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {}

  @Post('/add-image')
  addImage(@Body() attachImageDto: AttachImageDto) {
    // get the post.
    // find the image base of its key.
    // update the post with the image.
  }

  @Patch(':id')
  update(@Body() updatePostDto: CreatePostDto) {}

  @Delete(':id')
  delete(@Param('id') id: number) {}
}
