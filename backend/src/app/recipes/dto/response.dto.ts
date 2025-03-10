export interface IngredientsResponseDto {
  productUuid: string;
  count: number;
}

export interface RecipeListResponseDto {
  title: string;
  description: string;
  kitchenUuid: string;
  products: IngredientsResponseDto[];
  uuid: string;
  authorNickname: string;
  authorUuid: string;
}
