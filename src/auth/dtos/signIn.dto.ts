import { IsEmail, MinLength } from 'class-validator';

export default class SignInDto {
  @IsEmail()
  public readonly email: string;

  @MinLength(8)
  public readonly password: string;
}
