import { RefreshRequestDto } from "./search-response.dto";
import { SearchRequestOperations } from "./search-request.dto";

export class SearchOperationsMapper {
  index: string;

  constructor(index: string) {
    this.index = index;
  }

  mapToOperation(doc: RefreshRequestDto): SearchRequestOperations {
    return [{ index: { _index: this.index, _id: doc.uuid } }, doc];
  }

  mapToOperations(doc: string[]): SearchRequestOperations[] {
    return doc.flatMap((docItem) => this.mapToOperation(docItem));
  }
}
