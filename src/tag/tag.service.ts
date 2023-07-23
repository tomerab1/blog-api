import { Injectable, NotFoundException } from '@nestjs/common';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

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
}
