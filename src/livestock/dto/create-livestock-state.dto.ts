import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class CreateLivestockStateDto {
  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsString()
  description: string;

  livestock_id?: string;
}
