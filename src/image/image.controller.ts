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
import UpdateImageDto from './dtos/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import ImageQueryDto from './dtos/image-query.dto';

@Controller('upload-image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  getImage(@Query() imageQueryDto: ImageQueryDto) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Req() request: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.imageService.create(request, file.buffer, file.originalname);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  updateImage(@Body() updateImage: UpdateImageDto) {}

  @Delete()
  deleteImage(@Query() imageQueryDto: ImageQueryDto) {}
}
