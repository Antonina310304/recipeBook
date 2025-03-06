import { estypes } from "@elastic/elasticsearch";

export const mapping: estypes.MappingTypeMapping = {
  properties: {
    ingredients: {
      type: "text",
      analyzer: "russian",
      fields: {
        keyword: {
          type: "keyword",
          ignore_above: 1024
        }
      }
    },
    title: {
      type: "text",
      analyzer: "russian",
      fields: {
        keyword: {
          type: "keyword",
          ignore_above: 1024
        }
        // word_delimiter: {
        //   type: "text",
        //   analyzer: "word_delimiter"
        // }
      }
    },
    id: {
      type: "keyword"
    },
    description: {
      type: "text",
      analyzer: "russian",
      fields: {
        keyword: {
          type: "keyword",
          ignore_above: 256
        }
      }
    }
  }
};
