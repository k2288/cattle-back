import { PartialType } from '@nestjs/mapped-types';
import { CreateLivestockStateDto } from './create-livestock-state.dto';

export class UpdateLivestockStateDto extends PartialType(
  CreateLivestockStateDto,
) {}
