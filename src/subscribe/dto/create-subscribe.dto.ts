import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubscribeDto {
  @IsString()
  @IsNotEmpty()
  public readonly email: string;
}
