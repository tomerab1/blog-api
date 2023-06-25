import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Image from './entities/image.entity';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import UpdateImageDto from './dtos/update-image.dto';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { REQUEST_USER_KEY } from 'src/iam/iam.constants';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async findAll(paginationDto: PaginationQueryDto) {}

  async findOne(id: number) {}

  async create(request: Request, buffer: Buffer, fileName: string) {
    const key = `${uuid()}-${fileName}`;
    await this.uploadFileToS3(buffer, key);

    const user = await this.userService.findOne(request[REQUEST_USER_KEY].sub);
    const createdImage = this.imageRepository.create({
      key: key,
      uri: `https://${this.configService.get(
        'AWS_BUCKET_NAME',
      )}.s3.amazonaws.com/${key}`,
      fileName,
      user: user,
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

  async update(updateImage: Request) {}
}
