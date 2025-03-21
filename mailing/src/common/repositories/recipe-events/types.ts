export interface RecipeSubscriberByEventsInterface {
  eventUuid: string;
  recipeUuid: string;
  userUuid: string;
}

export interface CommonRecipeListForMailing {
  eventUuid: string;
  userUuid: string;
  userName: string;
  userEmail: string;
  recipeTitle: string;
  description: string;
  authorUuid: string;
  author: string;
  recipeUuid: string;
}
export interface DataForMailingFoKitchens extends CommonRecipeListForMailing {
  kitchenUuid: string;
  kitchenTitle: string;
}
