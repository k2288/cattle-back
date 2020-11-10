import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateAuthcodeDto {
  @ApiProperty()
  @IsString()
  readonly code: string;

  @ApiProperty()
  @IsString()
  readonly phone: string;
}
