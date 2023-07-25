import { IsNumber, IsString, Min } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  @Min(1)
  public readonly sender: number;

  @IsNumber()
  @Min(1)
  public readonly room: number;

  @IsString()
  public readonly text: string;
}
