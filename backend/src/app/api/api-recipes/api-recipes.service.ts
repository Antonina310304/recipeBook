import { Injectable, NotFoundException } from "@nestjs/common";

import { RecipesRepository } from "../../../common/repositories/recipes/recipes.repository";
import { PageDtoType } from "../../../common/dto/page-dto/page-dto.type";
import { CommonRecipeCondition } from "../../../common/repositories/recipes/types";
import { PageDtoBuilder } from "../../../common/dto/page-dto/page-dto.builder";

import { RecipesResponseDto } from "./dto/response.dto";
import { RequestRecipeDto } from "./dto/request.dto";

@Injectable()
export class ApiRecipesService {
  constructor(private readonly recipesRepository: RecipesRepository) {}

  async getRecipes(condition: RequestRecipeDto, pageSize: number): Promise<PageDtoType<RecipesResponseDto>> {
    const recipeCondition: CommonRecipeCondition = {
      authorUuid: condition.author,
      kitchenUuid: condition.kitchen,
      dateInterval: {
        since: condition.since,
        until: condition.until
      }
    };
    const entities: RecipesResponseDto[] = await this.recipesRepository.findMany({
      ...recipeCondition,
      offset: (condition.page - 1) * pageSize,
      pageSize: pageSize
    });
    const itemCount: number = await this.recipesRepository.getItemCount(recipeCondition);

    const builder: PageDtoBuilder<RecipesResponseDto> = new PageDtoBuilder<RecipesResponseDto>();

    builder.setItems(entities);
    builder.setMeta(condition.page, pageSize, itemCount);

    return builder.build();
  }

  async getRecipe(uuid: string): Promise<RecipesResponseDto> {
    const recipeEntity: RecipesResponseDto | undefined = await this.recipesRepository.findByUuid(uuid);
    if (!recipeEntity) {
      throw new NotFoundException(uuid);
    }

    return recipeEntity;
  }
}
