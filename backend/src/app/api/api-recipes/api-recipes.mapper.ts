import { Injectable } from "@nestjs/common";

import { RecipesResponseInterface } from "../../../common/repositories/recipes/types";

import { IngredientsInterface, RecipeListInterface } from "./types";

@Injectable()
export class ApiRecipesMapper {
  mapRecipes(source: RecipesResponseInterface[], destination: RecipeListInterface[]): void {
    const ingredients: Record<string, IngredientsInterface[]> = {};
    const recipes: Record<string, RecipeListInterface> = {};

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
        dateCreate: recipesItem.dateCreate,
        kitchenUuid: recipesItem.kitchenUuid,
        uuid: recipesItem.uuid,
        authorUuid: recipesItem.authorUuid,
        products: ingredients[recipesItem.uuid]
      };
    });

    destination.push(...(Object.values(recipes) ?? []));
  }
}
