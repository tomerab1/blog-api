import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import ImageQueryDto from './dtos/image-query.dto';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';

@Controller('upload-image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  find(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.imageService.find(paginationQueryDto);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.imageService.create(file.buffer, file.originalname);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Body() { key }: ImageQueryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.imageService.update(key, file);
  }

  @Delete()
  delete(@Query() { key }: ImageQueryDto) {
    return this.imageService.delete(key);
  }
}
