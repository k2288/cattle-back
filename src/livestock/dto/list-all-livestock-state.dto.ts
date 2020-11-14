import { ListAllEntitiesDto } from './list-all-entities.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ListAllLivestockStateDto extends ListAllEntitiesDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  field?: string;
}
