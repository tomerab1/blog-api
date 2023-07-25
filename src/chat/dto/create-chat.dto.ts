import { IsNumber, Min } from 'class-validator';

export class CreateChatDto {
  @IsNumber()
  @Min(1)
  public readonly sender: number;

  @IsNumber()
  @Min(1)
  public readonly recipient: number;
}
