import { Min, IsNumber } from 'class-validator';

export class DeleteChatDto {
  @IsNumber()
  @Min(1)
  public readonly id: number;
}
