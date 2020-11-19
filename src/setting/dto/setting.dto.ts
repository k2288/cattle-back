import { ApiProperty } from '@nestjs/swagger';

export class SettingDto {
  @ApiProperty({ isArray: true })
  livestock_state: string[];
  @ApiProperty({ isArray: true })
  livestock_type: string[];

  constructor(livestock_state, livestock_type) {
    this.livestock_state = livestock_state;
    this.livestock_type = livestock_type;
  }
}
