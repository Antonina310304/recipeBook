import { Module } from "@nestjs/common";
import { ElasticsearchModule } from "@nestjs/elasticsearch";

import { SearchService } from "./search.service";

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: () => ({
        node: "http://elastic:9200",
        maxRetries: 10,
        requestTimeout: 60000,
        pingTimeout: 60000,
        sniffOnStart: true,
        auth: {
          username: "elastic",
          password: "elastic"
        }
      })
    })
  ],
  providers: [SearchService],
  exports: [SearchService]
})
export class SearchModule {}
