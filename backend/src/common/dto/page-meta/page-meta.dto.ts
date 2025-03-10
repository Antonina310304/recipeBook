import { IsDefined, IsNumber } from "class-validator";

import { PageOptionsDto } from "./dto.types";

export class PageMetaDto {
  @IsNumber()
  @IsDefined()
  readonly page: number;

  @IsNumber()
  @IsDefined()
  readonly pageSize: number;

  @IsNumber()
  @IsDefined()
  readonly pageCount: number;

  constructor(pageOptionsDto: PageOptionsDto, itemCount: number) {
    this.page = pageOptionsDto.page;
    this.pageSize = pageOptionsDto.take;
    this.pageCount = Math.ceil(itemCount / this.pageSize);
  }
}
