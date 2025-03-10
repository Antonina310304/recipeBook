import { Injectable } from "@nestjs/common";

import { RecipesByPageCondition } from "../../common/repositories/recipes/types";
import { RecipesRepository } from "../../common/repositories/recipes/recipes.repository";
import { PageDtoBuilder } from "../../common/dto/page-dto/page-dto.builder";
import { PageDtoType } from "../../common/dto/page-dto/page-dto.type";
import { RecipesResponseDto } from "../../common/repositories/recipes/dto/response.dto";

import { RecipesMapper } from "./recipes.mapper";
import { RecipeListResponseDto } from "./dto/response.dto";

@Injectable()
export class RecipesService {
  constructor(private readonly recipesRepository: RecipesRepository) {}

  async getRecipes(condition: RecipesByPageCondition): Promise<PageDtoType<RecipeListResponseDto>> {
    const entities: RecipesResponseDto[] = await this.recipesRepository.findByCondition(condition);
    const itemCount: number = await this.recipesRepository.getItemCount(condition);

    const response: RecipeListResponseDto[] = [];

    const apiRecipesMapper: RecipesMapper = new RecipesMapper();
    apiRecipesMapper.mapRecipes(entities, response);

    const builder: PageDtoBuilder<RecipeListResponseDto> = new PageDtoBuilder<RecipeListResponseDto>();

    builder.setItems(response);
    builder.setMeta({ pageCount: itemCount, page: condition.page, pageSize: condition.take });

    return builder.build();
  }

  async getRecipe(uuid: string): Promise<RecipeListResponseDto> {
    const entity: RecipesResponseDto[] = await this.recipesRepository.findByUuid(uuid);

    const response: RecipeListResponseDto[] = [];
    const apiRecipesMapper: RecipesMapper = new RecipesMapper();
    apiRecipesMapper.mapRecipes(entity, response);

    return response[0];
  }
}
