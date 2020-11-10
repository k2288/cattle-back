import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty()
  readonly user_id: string;
  @ApiProperty()
  readonly token: string;
  @ApiProperty()
  readonly phone: string;
}
