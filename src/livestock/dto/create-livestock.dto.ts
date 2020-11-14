import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class CreateLivestockDto {
  @ApiProperty()
  @IsString()
  tagNo: string;

  @ApiProperty()
  @IsDate()
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
