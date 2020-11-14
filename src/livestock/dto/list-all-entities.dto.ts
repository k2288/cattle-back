import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class ListAllEntitiesDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  readonly offset: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  readonly pageSize: number;


}
