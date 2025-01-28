import { BaseConditionList, DateInterval } from "../../types";
import { RecipesEntity } from "../../entities/recipes.entity";

export interface CommonProductsCondition {
  uuid?: string;
  authorUuid?: string;
  kitchenUuid?: string;
  dateInterval?: DateInterval;
}

export interface RecipesByPageCondition extends BaseConditionList {
  authorUuid?: string;
  kitchenUuid?: string;
  dateInterval?: DateInterval;
}

export interface RecipesResponseInterface {
  title: string;
  description: string;
  kitchenUuid: string;
  productUuid: string;
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
