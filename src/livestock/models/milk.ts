import { ApiProperty } from '@nestjs/swagger';

export class Milk {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  date: Date;
}
