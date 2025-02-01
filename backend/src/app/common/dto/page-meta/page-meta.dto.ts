import { IsDefined, IsNumber } from "class-validator";

import { PageMetaDtoParameters } from "./dto.types";

export class PageMetaDto {
  @IsNumber()
  @IsDefined()
  readonly page: number;

  @IsNumber()
  @IsDefined()
  readonly take: number;

  @IsNumber()
  @IsDefined()
  readonly pageCount: number;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.pageCount = Math.ceil(itemCount / this.take);
  }
}
