import { Module, OnModuleInit } from "@nestjs/common";
import { ElasticsearchModule } from "@nestjs/elasticsearch";

import { ConfigModule } from "../common/config/config.module";
import { ConfigService } from "../common/config/config.service";
import { ElasticSearchConfig } from "../common/config/config.schema";

import { SearchService } from "./search.service";

@Module({
  imports: [
    ConfigModule,
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const elasticSearchConfig: ElasticSearchConfig = configService.elasticSearch;

        return {
          node: elasticSearchConfig.url,
          maxRetries: elasticSearchConfig.maxRetries,
          requestTimeout: elasticSearchConfig.requestTimeout,
          pingTimeout: elasticSearchConfig.pingTimeout,
          sniffOnStart: elasticSearchConfig.sniffOnStart,
          auth: {
            username: elasticSearchConfig.auth.userName,
            password: elasticSearchConfig.auth.password
          }
        };
      }
    })
  ],
  providers: [SearchService],
  exports: [SearchService]
})
export class SearchModule implements OnModuleInit {
  constructor(private readonly searchService: SearchService) {}

  public async onModuleInit(): Promise<void> {
    await this.searchService.createIndex();
  }
}
