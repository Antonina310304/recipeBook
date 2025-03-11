import { IsNumberString, IsOptional, IsString, IsUUID } from "class-validator";

export class RequestRecipeDto {
  @IsUUID()
  @IsOptional()
  author: string;

  @IsUUID()
  @IsOptional()
  kitchen: string;

  @IsString()
  @IsOptional()
  since: string;

  @IsString()
  @IsOptional()
  until: string;

  @IsNumberString()
  @IsOptional()
  page: number;
}
