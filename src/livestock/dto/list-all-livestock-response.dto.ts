import { Livestock } from '../schemas/livestock.schema';
import { ApiProperty } from '@nestjs/swagger';
import { ListAllResponseDto } from './list-all-response.dto';

export class ListAllLivestockResponseDto extends ListAllResponseDto<Livestock> {
  @ApiProperty({ isArray: true, type: Livestock })
  public contents: Livestock[];
}
