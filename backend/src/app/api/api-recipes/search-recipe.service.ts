import { estypes } from "@elastic/elasticsearch";
import { Injectable } from "@nestjs/common";

import { SearchQueryBuilder } from "../../search/search-query.builder";
import { SearchService } from "../../search/search.service";
import { SearchResponseDto } from "../../search/search-response.dto";
import { RecipesResponseInterface } from "../../common/repositories/recipes/types";
import { RecipesRepository } from "../../common/repositories/recipes/recipes.repository";

import { RecipeListInterface, SearchTypeDto } from "./types";
import { ApiRecipesMapper } from "./api-recipes.mapper";

@Injectable()
export class SearchRecipeService {
  constructor(
    private readonly searchService: SearchService,
    private readonly recipesRepository: RecipesRepository
  ) {}

  async search(queryString: string): Promise<RecipeListInterface[]> {
    const searchQueryBuilder: SearchQueryBuilder = new SearchQueryBuilder();
    const query: estypes.QueryDslQueryContainer = searchQueryBuilder.buildSearchQuery(queryString);
    const searchResponse: SearchResponseDto<SearchTypeDto> = await this.searchService.search(query, "common", 0);

    const uuidsRecipes: string[] = searchResponse.data.map((recipe) => {
      return recipe.uuid;
    });

    const entity: RecipesResponseInterface[] = await this.recipesRepository.findByUuids(uuidsRecipes);
    const apiRecipesMapper: ApiRecipesMapper = new ApiRecipesMapper();
    const response: RecipeListInterface[] = [];
    apiRecipesMapper.mapRecipes(entity, response);

    return response;
  }
}
