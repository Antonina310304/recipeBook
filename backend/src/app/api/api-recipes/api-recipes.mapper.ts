import { Injectable } from "@nestjs/common";

import { RecipesResponseInterface } from "../../common/repositories/recipes/types";

import { RecipeListInterface } from "./types";

@Injectable()
export class ApiRecipesMapper {
  mapRecipes(source: RecipesResponseInterface[], destination: RecipeListInterface[]): void {
    source.forEach((item) => {
      destination.push(this.mapRecipe(item));
    });
  }

  mapRecipe(source: RecipesResponseInterface): RecipeListInterface {
    return {
      authorNickname: source.authorNickname,
      title: source.title,
      description: source.description,
      dateCreate: source.dateCreate,
      kitchenUuid: source.kitchenUuid,
      uuid: source.uuid,
      authorUuid: source.authorUuid,
      manual: source.manual,
      products: source.products
    };
  }
}
