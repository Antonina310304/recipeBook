import { Controller, Get, Param, ParseUUIDPipe, Res } from "@nestjs/common";
import { Response } from "express";
import { Query } from "@nestjs/common/decorators/http/route-params.decorator";

import { PageDtoType } from "../../../common/dto/page-dto/page-dto.type";
import { QueryTransformPipe } from "../../../common/pipes/query-transform.pipe";
import { CommonErrorBuilder } from "../../../common/common-error-builder/common-error-builder";
import { ErrorDescription } from "../../../common/common-error-builder/types";

import { ApiRecipesService } from "./api-recipes.service";
import { RequestRecipeDto } from "./dto/request.dto";
import { RecipesResponseDto } from "./dto/response.dto";
import { PAGE_SIZE } from "./constants";

@Controller("recipes")
export class ApiRecipesController {
  constructor(private readonly apiRecipesService: ApiRecipesService) {}

  @Get()
  async findMany(
    @Res() response: Response<PageDtoType<RecipesResponseDto> | ErrorDescription>,
    @Query(new QueryTransformPipe<RequestRecipeDto>()) query?: RequestRecipeDto
  ): Promise<void> {
    try {
      const res: PageDtoType<RecipesResponseDto> = await this.apiRecipesService.getRecipes(query, PAGE_SIZE);
      response.status(200).send(res);
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }

  @Get(`/:uuid`)
  async findOne(
    @Param("uuid", new ParseUUIDPipe()) uuid: string,
    @Res() response: Response<RecipesResponseDto | ErrorDescription>
  ): Promise<void> {
    try {
      const res: RecipesResponseDto = await this.apiRecipesService.getRecipe(uuid);
      response.status(200).send(res);
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }
}
