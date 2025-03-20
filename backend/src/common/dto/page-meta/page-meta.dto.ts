import { IsDefined, IsNumber } from "class-validator";

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

  constructor(page: number, take: number, itemCount: number) {
    this.page = page;
    this.pageSize = take;
    this.pageCount = Math.ceil(itemCount / this.pageSize);
  }
}
