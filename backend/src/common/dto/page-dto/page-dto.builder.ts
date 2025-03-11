import { IsArray } from "class-validator";
import { Type } from "class-transformer";

import { PageMetaDto } from "../page-meta/page-meta.dto";

import { PageDtoType } from "./page-dto.type";

export class PageDtoBuilder<T> {
  @IsArray()
  data: T[];

  @Type(() => PageMetaDto)
  meta: PageMetaDto;

  setItems(data: T[]): void {
    this.data = data;
  }

  setMeta(page: number, take: number, itemCount: number): void {
    this.meta = new PageMetaDto(page, take, itemCount);
  }

  build(): PageDtoType<T> {
    return {
      data: this.data,
      meta: this.meta
    };
  }
}
