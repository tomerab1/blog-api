import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    const tag = await this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(tag);
  }

  async findAll() {
    return await this.tagRepository.find();
  }

  async findOne(id: number) {
    const tag = await this.tagRepository.findOne({
      where: { id },
      relations: { posts: true },
    });
    if (!tag) throw new NotFoundException(`Cannot find tag with id=${id}`);
    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tag = await this.tagRepository.preload({
      id,
      ...updateTagDto,
    });
    return await this.tagRepository.save(tag);
  }

  async remove(id: number) {
    const tag = await this.findOne(id);
    return await this.tagRepository.remove(tag);
  }
}
