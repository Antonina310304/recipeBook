export interface IngredientsResponseDto {
  productUuid: string;
  count: number;
}

export interface RecipesResponseDto {
  title: string;
  description: string;
  kitchenUuid: string;
  manual: string;
  dateCreate: string;
  products: IngredientsResponseDto[];
  uuid: string;
  authorNickname: string;
  authorUuid: string;
}
