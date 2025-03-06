import { RecipeEventsEntity } from "../../common/entities/recipe-events.entity";

export type ConfirmRecipeEventsInterface = Omit<RecipeEventsEntity, "parsedEmail" | "parsedPortal"> &
  Partial<Omit<RecipeEventsEntity, "uuid" | "recipeUuid">>;
