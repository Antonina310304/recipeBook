import { Injectable } from "@nestjs/common";

import { RecipesResponseDto } from "../../common/repositories/recipes/dto/response.dto";

import { IngredientsResponseDto, RecipeListResponseDto } from "./dto/response.dto";

@Injectable()
export class RecipesMapper {
  mapRecipes(source: RecipesResponseDto[], destination: RecipeListResponseDto[]): void {
    const ingredients: Record<string, IngredientsResponseDto[]> = {};
    const recipes: Record<string, RecipeListResponseDto> = {};

    source.forEach((recipesItem) => {
      if (!ingredients[recipesItem.uuid]) {
        ingredients[recipesItem.uuid] = [];
      }

      if (recipesItem.productUuid) {
        ingredients[recipesItem.uuid].push({
          productUuid: recipesItem.productUuid,
          count: recipesItem.count
        });
      }

      recipes[recipesItem.uuid] = {
        authorNickname: recipesItem.authorNickname,
        title: recipesItem.title,
        description: recipesItem.description,
        kitchenUuid: recipesItem.kitchenUuid,
        uuid: recipesItem.uuid,
        authorUuid: recipesItem.authorUuid,
        products: ingredients[recipesItem.uuid]
      };
    });

    destination.push(...(Object.values(recipes) ?? []));
  }
}
