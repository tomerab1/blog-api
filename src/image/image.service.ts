import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Image from './entities/image.entity';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import UpdateImageDto from './dtos/update-image.dto';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { extracTokenFromHeaders } from 'src/common/extract-token.helper';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async findAll(paginationDto: PaginationQueryDto) {}

  async findOne(id: number) {}

  async create(request: Request, buffer: Buffer, fileName: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Body: buffer,
        Key: `${uuid()}-${fileName}`,
      })
      .promise();

    const user = await this.userService.findOne(this.getUserId(request));

    const createdImage = this.imageRepository.create({
      key: uploadResult.Key,
      uri: uploadResult.Location,
      fileName,
      user: user,
    });

    return this.imageRepository.save(createdImage);
  }

  async update(updateImage: Request) {}

  private getUserId(request: Request): number {
    const payload = extracTokenFromHeaders(request);
    const payloadDecoded = this.jwtService.verify(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });
    return +payloadDecoded.sub;
  }
}
