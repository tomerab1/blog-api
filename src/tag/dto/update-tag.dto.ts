import { PartialType } from '@nestjs/swagger';
import { CreateTagDto } from './create-tag.dto';
import { IsPositive } from 'class-validator';

export class UpdateTagDto extends PartialType(CreateTagDto) {
  @IsPositive()
  public readonly id: number;
}
