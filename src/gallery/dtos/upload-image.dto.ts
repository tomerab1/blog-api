import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class UploadImageDto {
  @IsNumber()
  readonly key: number;

  @IsString()
  @IsNotEmpty()
  readonly uri: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly desc: string;

  @IsDate()
  readonly uploadDate: Date;
}
