import { PartialType } from '@nestjs/mapped-types';
import UploadImageDto from './upload-image.dto';

export default class UpdateImageDto extends PartialType(UploadImageDto) {}
