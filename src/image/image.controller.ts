import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express, Request } from 'express';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import ImageQueryDto from './dtos/image-query.dto';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  find(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.imageService.find(paginationQueryDto);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Req() request: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.imageService.create(request, file.buffer, file.originalname);
  }

  // Create route to attach image to post
  @Post('/add-to-post/:id')
  @HttpCode(HttpStatus.OK)
  addImageToPost(@Param('id') id: number, @Body() { key }: ImageQueryDto) {
    return this.imageService.addImageToPost(id, key);
  }

  @Patch(':key')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param() { key }: ImageQueryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.imageService.update(key, file);
  }

  @Delete(':key')
  delete(@Param() { key }: ImageQueryDto) {
    return this.imageService.delete(key);
  }
}
