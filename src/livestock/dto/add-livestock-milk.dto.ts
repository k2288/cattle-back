import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';

export class AddLivestockMilkDto {
  @ApiProperty({ example: '2024-06-03T00:00:00.000Z' })
  @Type(() => Date)
  @IsDate()
  date: Date;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  amount: number;
}
