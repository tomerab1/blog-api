import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export default class CreateUserDto {
  @IsEmail()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  public readonly lastName: string;

  @MinLength(8)
  public readonly password: string;
}
