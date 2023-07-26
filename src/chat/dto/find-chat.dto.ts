import { Min, IsNumber } from 'class-validator';

export class FindChatDto {
  @IsNumber()
  @Min(1)
  public readonly id: number;
}
