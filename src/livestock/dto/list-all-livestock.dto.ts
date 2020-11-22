import { ListAllEntitiesDto } from './list-all-entities.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class ListAllLivestockDto extends ListAllEntitiesDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsOptional()
  @Transform((value: string) => {
    if (typeof value === 'string') {
      return [value];
    }
    return value;
  })
  readonly state?: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsOptional()
  @Transform((value: string) => {
    if (typeof value === 'string') {
      return [value];
    }
    return value;
  })
  readonly gender?: string[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  searchTerm?: string;
}
