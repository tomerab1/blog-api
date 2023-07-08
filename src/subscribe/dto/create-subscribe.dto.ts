import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubscribeDto {
  @IsString()
  @IsNotEmpty()
  public readonly email: string;

  @IsBoolean()
  @IsNotEmpty()
  public readonly paid: boolean;
}
