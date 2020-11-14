import { ApiProperty } from '@nestjs/swagger';

export class ListAllResponseDto<T> {
  @ApiProperty()
  public pageSize: number;
  @ApiProperty()
  public offset: number;
  @ApiProperty()
  public totalElements: number;
  @ApiProperty()
  public contents: T[];
  constructor(pageSize, offset, totalElements, contents) {
    this.pageSize = pageSize;
    this.offset = offset;
    this.totalElements = totalElements;
    this.contents = contents;
  }
}
