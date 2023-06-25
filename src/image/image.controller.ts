import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express, Request } from 'express';
import { ImageService } from './image.service';
import UpdateImageDto from './dtos/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload-image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Req() request: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.imageService.create(request, file.buffer, file.originalname);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  updateImage(@Body() updateImage: UpdateImageDto) {}

  @Get(':id')
  getImage(@Param('id') id: number) {}
}
