import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { ImageService } from './image.service';
import UpdateImageDto from './dtos/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload-image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.imageService.create(file.buffer, file.originalname);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  updateImage(@Body() updateImage: UpdateImageDto) {}

  @Get(':id')
  getImage(@Param('id') id: number) {}
}
