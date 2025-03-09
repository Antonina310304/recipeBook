import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { estypes } from "@elastic/elasticsearch";

import { ConfigService } from "../common/config/config.service";
import { IndexElasticSearch } from "../common/config/config.schema";

import { mapping } from "./mapping";
import { RefreshRequestDto, SearchResponseDto } from "./search-response.dto";
import { SearchOperationsMapper } from "./search-operations.mapper";

@Injectable()
export class SearchService {
  constructor(
    private readonly esService: ElasticsearchService,
    private readonly configService: ConfigService
  ) {}

  public async createIndex(): Promise<void> {
    const indexes: IndexElasticSearch[] = this.configService.elasticSearch.indexes;
    for (const indexItem of indexes) {
      try {
        const index: string = indexItem.name;
        const checkIndex: boolean = await this.esService.indices.exists({ index });
        if (!checkIndex) {
          await this.esService.indices.create({
            index,
            mappings: mapping
          });
        }
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  }

  public async updateDocument(request: RefreshRequestDto[], index: string): Promise<void> {
    await this.bulk(request, index, true);
  }

  public async createDocument(request: RefreshRequestDto[], index: string): Promise<void> {
    await this.bulk(request, index, false);
  }

  public async removeDocument(request: string[], index: string): Promise<unknown> {
    try {
      return await this.esService.deleteByQuery({
        index,
        query: {
          ids: { values: request }
        }
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  public async search<T>(
    query: estypes.QueryDslQueryContainer,
    index: string,
    from: number,
    size: number = 1000
  ): Promise<SearchResponseDto<T>> {
    try {
      const body: estypes.SearchResponseBody<T> = await this.esService.search<T>({
        index,
        from,
        size,
        query
      });
      const total: number = ((body.hits?.total as estypes.SearchTotalHits).value || body.hits.total) as number;
      const hits: estypes.SearchHit<T>[] = body.hits.hits;
      const data: T[] = hits.map((item: estypes.SearchHit<T>) => item._source);
      return {
        total,
        data
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  private async bulk(request: RefreshRequestDto[], index: string, refresh: boolean): Promise<void> {
    const searchOperationsMapper: SearchOperationsMapper = new SearchOperationsMapper(index);
    try {
      await this.esService.bulk({
        refresh,
        operations: searchOperationsMapper.mapToOperations(request)
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
