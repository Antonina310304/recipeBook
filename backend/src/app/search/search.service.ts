import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";

@Injectable()
export class SearchService {
  constructor(private readonly esService: ElasticsearchService) {}

  async search(q: string) {
    const result = await this.esService.search({
      index: "csv",
      body: {
        query: {
          match: {
            title: q
          }
        }
      }
    });

    return result;
  }
}
