import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Tag } from 'src/tag/entities/tag.entity';

export default class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  public readonly title: string;

  @IsString()
  @IsOptional()
  public readonly content: string;

  @IsArray({ each: true })
  @IsOptional()
  public readonly tags: Tag[];
}
