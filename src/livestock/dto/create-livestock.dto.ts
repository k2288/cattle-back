import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsOnlyDate } from '../../is-only-date.decorator';

export class CreateLivestockDto {
  @ApiProperty()
  @IsString()
  tagNo: string;

  @ApiProperty()
  @IsOnlyDate()
  birthDate: Date;

  @ApiProperty()
  @IsString()
  gender: string;

  @ApiProperty()
  @IsString()
  mother: string;

  @ApiProperty()
  @IsString()
  inseminator: string;

  user_id?: string;
}
