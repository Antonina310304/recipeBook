import { IsArray, IsDefined, IsNumber, IsString } from "class-validator";

export interface IngredientsResponseDto {
  productUuid: string;
  count: number;
}

export interface RecipesResponseDto {
  title: string;
  description: string;
  kitchenUuid: string;
  dateCreate: string;
  products: IngredientsResponseDto[];
  uuid: string;
  authorNickname: string;
  authorUuid: string;
  manual: string;
}

export class IngredientsData {
  @IsDefined()
  @IsString()
  productUuid: string;

  @IsDefined()
  @IsNumber()
  count: number;
}
export class CreateRecipeData {
  @IsDefined()
  @IsString()
  title: string;

  @IsDefined()
  @IsString()
  description: string;

  @IsDefined()
  @IsString()
  kitchenUuid: string;

  @IsDefined()
  @IsString()
  manual: string;

  @IsDefined()
  @IsArray()
  products: IngredientsData[];
}

export type SearchTypeDto = {
  uuid: string;
  title: string;
  description: string;
  products: string[];
};
