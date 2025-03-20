import { PageMetaDto } from "../page-meta/page-meta.dto";

export interface PageDtoType<T> {
  meta: PageMetaDto;
  data: T[];
}
