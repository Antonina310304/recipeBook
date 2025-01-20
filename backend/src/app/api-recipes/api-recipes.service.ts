import { Injectable } from "@nestjs/common";

import { RecipesByPageCondition, RecipesResponseInterface } from "../../common/repositories/recipes/types";
import { RecipesRepository } from "../../common/repositories/recipes/recipes.repository";
import { PageMetaDto } from "../../common/dto/page-meta/page-meta.dto";
import { PageDto } from "../../common/dto/page-dto/page.dto";

import { RecipeListInterface } from "./types";
import { ApiRecipesMapper } from "./api-recipes.mapper";

@Injectable()
export class ApiRecipesService {
  constructor(
    private readonly recipesService: RecipesRepository,
    private readonly apiRecipesMapper: ApiRecipesMapper
  ) {}

  async getRecipes(condition: RecipesByPageCondition): Promise<PageDto<RecipeListInterface>> {
    const entities: RecipesResponseInterface[] = await this.recipesService.findByCondition(condition);
    const itemCount: number = await this.recipesService.getItemCount(condition);

    const response: RecipeListInterface[] = [];

    this.apiRecipesMapper.mapRecipes(entities, response);

    const pageMetaDto: PageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: { page: condition.page, take: condition.take }
    });

    return new PageDto(response, pageMetaDto);
  }

  async getRecipe(uuid: string): Promise<RecipeListInterface> {
    const entity: RecipesResponseInterface[] = await this.recipesService.findByUuid(uuid);

    const response: RecipeListInterface[] = [];
    this.apiRecipesMapper.mapRecipes(entity, response);

    return response[0];
  }
}
