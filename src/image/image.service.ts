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
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly configService: ConfigService,
    private readonly s3Service: S3Client,
  ) {}

  async find({ offset, limit }: PaginationQueryDto) {
    return this.imageRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne(key: string) {
    return this.imageRepository.findOne({ where: { key } });
  }

  async create(buffer: Buffer, fileName: string) {
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
    try {
      this.s3Service.send(
        new PutObjectCommand({
          Bucket: this.configService.get('AWS_BUCKET_NAME'),
          Body: body,
          Key: key,
        }),
      );
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  private async deleteImageFromS3(key: string) {
    try {
      await this.s3Service.send(
        new DeleteObjectCommand({
          Bucket: this.configService.get('AWS_BUCKET_NAME'),
          Key: key,
        }),
      );
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async delete(key: string) {
    const image = await this.imageRepository.findOne({ where: { key } });
    if (!image) throw new NotFoundException();
    await this.deleteImageFromS3(key);
    return this.imageRepository.remove(image);
  }

  async update(key: string, file: Express.Multer.File) {
    const image = await this.findOne(key);
    if (!image)
      throw new NotFoundException(`image with key=${key} was not found`);

    await this.deleteImageFromS3(key);
    const newKey = `${uuid()}-${file.filename}`;
    await this.uploadFileToS3(file.buffer, newKey);

    const newProperties = {
      key: newKey,
      uri: `https://${this.configService.get(
        'AWS_BUCKET_NAME',
      )}.s3.amazonaws.com/${newKey}`,
      fileName: file.filename,
      updatedAt: new Date(),
    } satisfies Partial<Image>;

    Object.assign(image, newProperties);
    return await this.imageRepository.save(image);
  }
}
