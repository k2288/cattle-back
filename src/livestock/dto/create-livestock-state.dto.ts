import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsOnlyDate } from '../../is-only-date.decorator';

export class CreateLivestockStateDto {
  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsOnlyDate()
  date: Date;

  @ApiProperty()
  @IsString()
  description: string;

  livestock_id?: string;
}
