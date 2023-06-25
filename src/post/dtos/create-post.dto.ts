import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  public readonly title: string;

  @IsString()
  @IsOptional()
  public readonly content: string;
}
