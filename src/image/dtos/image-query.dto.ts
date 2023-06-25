import { IsNotEmpty, IsString } from 'class-validator';

export default class ImageQueryDto {
  @IsString()
  @IsNotEmpty()
  public readonly key: string;
}
