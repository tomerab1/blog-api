import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Image from './entities/image.entity';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto/pagination-query.dto';
import UpdateImageDto from './dtos/update-image.dto';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly configService: ConfigService,
  ) {}

  async findAll(paginationDto: PaginationQueryDto) {}

  async findOne(id: number) {}

  async create(buffer: Buffer, fileName: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Body: buffer,
        Key: `${uuid()}-${fileName}`,
      })
      .promise();

    const fileStorageDb = {
      key: uploadResult.Key,
      uri: uploadResult.Location,
      fileName,
    } as Image;

    const createdFile = await this.imageRepository.create(fileStorageDb);
    await this.imageRepository.save(createdFile);
    return createdFile;
  }

  async update(updateImage: UpdateImageDto) {}
}
