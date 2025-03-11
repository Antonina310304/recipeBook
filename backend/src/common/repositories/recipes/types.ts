import { DateInterval } from "../../types";

export interface CommonRecipeCondition {
  recipeUuid?: string;
  authorUuid?: string;
  kitchenUuid?: string;
  dateInterval?: DateInterval;
}

export interface RecipesCommonCondition extends CommonRecipeCondition {
  offset?: number;
  take?: number;
}
