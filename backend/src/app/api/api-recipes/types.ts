import { IsArray, IsDefined, IsNumber, IsString } from "class-validator";

export interface IngredientsInterface {
  productUuid: string;
  count: number;
}
export interface RecipeListInterface {
  title: string;
  description: string;
  kitchenUuid: string;
  dateCreate: string;
  products: IngredientsInterface[];
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
