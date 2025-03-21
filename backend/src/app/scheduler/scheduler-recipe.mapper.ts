import { RefreshRequestDto } from "../search/search-response.dto";
import { RecipeSearchEventsEntity } from "../common/entities/recipe-search-events.entity";
import { RecipeSearchEventType } from "../common/types";
import {
  BaseRecipesSearchEventResponseDto,
  RecipesSearchEventResponseDto
} from "../common/dto/recipe-search-events/response.dto";

export class SchedulerRecipeMapper {
  mapToElasticSearchDto(recipe: RecipesSearchEventResponseDto): RefreshRequestDto {
    return {
      uuid: recipe.recipeUuid,
      title: recipe.title,
      description: recipe.description,
      products: recipe.products
    };
  }

  mapToRefreshEvent(
    recipe: BaseRecipesSearchEventResponseDto,
    eventType: RecipeSearchEventType
  ): RecipeSearchEventsEntity {
    return {
      uuid: recipe.uuid,
      recipeUuid: recipe.recipeUuid,
      eventType,
      parsed: true
    };
  }
}
