import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Image from './entities/image.entity';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { Request } from 'express';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly configService: ConfigService,
  ) {}

  async findAll(paginationDto: PaginationQueryDto) {}

  async findOne(key: string) {
    return this.imageRepository.findOne({ where: { key } });
  }

  async create(request: Request, buffer: Buffer, fileName: string) {
    const key = `${uuid()}-${fileName}`;
    await this.uploadFileToS3(buffer, key);

    const createdImage = this.imageRepository.create({
      key: key,
      uri: `https://${this.configService.get(
        'AWS_BUCKET_NAME',
      )}.s3.amazonaws.com/${key}`,
      fileName,
    });

    return this.imageRepository.save(createdImage);
  }

  private async uploadFileToS3(body: Buffer, key: string) {
    const s3 = new S3Client({
      region: this.configService.get('AWS_REGION'),
    });

    try {
      s3.send(
        new PutObjectCommand({
          Bucket: this.configService.get('AWS_BUCKET_NAME'),
          Body: body,
          Key: key,
        }),
      );
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async delete(key: string) {
    const image = await this.imageRepository.findOne({ where: { key } });
    if (!image) throw new NotFoundException();
    return await this.imageRepository.remove(image);
  }

  async update(updateImage: Request) {}
}
