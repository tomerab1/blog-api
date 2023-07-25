import { IsString } from 'class-validator';

export class UpdateCommentDto {
  @IsString()
  public readonly content: string;
}
