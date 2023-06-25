import { IsNotEmpty, IsString } from 'class-validator';

export default class AttachImageDto {
  @IsString()
  @IsNotEmpty()
  public readonly key: string;
}
