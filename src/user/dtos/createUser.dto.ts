import { IsNotEmpty, IsString } from 'class-validator';

export default class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  public readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public readonly password: string;
}
