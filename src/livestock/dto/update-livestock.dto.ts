import { PartialType } from '@nestjs/mapped-types';
import { CreateLivestockDto } from './create-livestock.dto';

export class UpdateLivestockDto extends PartialType(CreateLivestockDto) {}
