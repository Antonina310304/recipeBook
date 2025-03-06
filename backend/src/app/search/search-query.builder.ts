import { estypes } from "@elastic/elasticsearch";

export class SearchQueryBuilder {
  public buildSearchQuery(queryString: string): estypes.QueryDslQueryContainer {
    return {
      multi_match: {
        query: queryString,
        type: "cross_fields",
        fields: ["title", "title.word_delimiter", "products", "description", "description.word_delimiter"],
        operator: "or"
      }
    };
  }
}
