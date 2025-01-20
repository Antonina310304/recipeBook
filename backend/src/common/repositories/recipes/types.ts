import { BaseConditionList, DateInterval } from "../../types";

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
  count: number;
  uuid: string;
  authorNickname: string;
  authorUuid: string;
}
