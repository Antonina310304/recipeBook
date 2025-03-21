import { CommonPageCondition, DateInterval } from "../../types";
import { RecipesEntity } from "../../entities/recipes.entity";

export interface CommonRecipeCondition {
  recipeUuid?: string;
  authorUuid?: string;
  kitchenUuid?: string;
  dateInterval?: DateInterval;
}

export interface RecipesCommonCondition extends CommonRecipeCondition, CommonPageCondition {}
export interface RecipesByPageCondition extends CommonPageCondition {
  authorUuid?: string;
  kitchenUuid?: string;
  dateInterval?: DateInterval;
}

export interface RecipesResponseInterface {
  title: string;
  description: string;
  kitchenUuid: string;
  products: {
    count: number;
    productUuid: string;
  }[];
  dateCreate: string;
  count: number;
  uuid: string;
  authorNickname: string;
  authorUuid: string;
  manual: string;
}

export type UpdateRecipeInterface = {
  uuid: string;
  userUuid: string;
} & Partial<Omit<RecipesEntity, "dateCreate" | "uuid" | "userUuid">>;

export interface UuidListInterface {
  uuid: string;
}
