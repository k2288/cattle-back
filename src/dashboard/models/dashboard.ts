import { ApiProperty } from '@nestjs/swagger';

export class Dashboard {
  @ApiProperty()
  total: number;

  @ApiProperty()
  dry: number;

  @ApiProperty()
  calved: number;

  @ApiProperty()
  insemination: number;

  @ApiProperty()
  milked: number;

  @ApiProperty()
  heifer: number;

  @ApiProperty()
  abortion: number;

  @ApiProperty()
  bull: number;

  @ApiProperty()
  cow: number;

  constructor(
    total,
    dry,
    calved,
    insemination,
    milked,
    heifer,
    abortion,
    bull,
    cow,
  ) {
    this.total = total;
    this.dry = dry;
    this.calved = calved;
    this.insemination = insemination;
    this.milked = milked;
    this.heifer = heifer;
    this.abortion = abortion;
    this.bull = bull;
    this.cow = cow;
  }
}
