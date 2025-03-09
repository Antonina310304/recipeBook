export interface RecipesSearchEventResponseDto extends BaseRecipesSearchEventResponseDto {
  title: string;
  description: string;
  products: string[];
}

export type BaseRecipesSearchEventResponseDto = {
  uuid: string;
  recipeUuid: string;
};
