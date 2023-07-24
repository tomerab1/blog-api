import { IsNumber, IsString, Min } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  readonly content: string;

  @IsNumber()
  @Min(0)
  readonly postId: number;
}
