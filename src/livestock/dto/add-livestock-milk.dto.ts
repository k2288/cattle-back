import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber } from 'class-validator';

export class AddLivestockMilkDto {
  @ApiProperty()
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsNumber()
  amount: number;
}
