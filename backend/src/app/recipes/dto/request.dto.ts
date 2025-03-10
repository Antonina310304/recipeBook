import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class RequestRecipeDtoDto {
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

  @IsNumber()
  @IsOptional()
  page: number;
}
