import { Controller, Get, Param, ParseUUIDPipe, Res } from "@nestjs/common";
import { Response } from "express";
import { Query } from "@nestjs/common/decorators/http/route-params.decorator";

import { BaseErrorInterface } from "../../common/types";
import { CommonErrorBuilder } from "../../common/common-error-builder/common-error-builder";
import { PageDtoType } from "../../common/dto/page-dto/page-dto.type";
import { QueryTransformPipe } from "../../common/pipes/query-transform.pipe";

import { ApiRecipesService } from "./api-recipes.service";
import { PAGE_SIZE } from "./constants";
import { RequestRecipeDto } from "./dto/request.dto";
import { RecipesResponseDto } from "./dto/response.dto";

@Controller("recipes")
export class ApiRecipesController {
  constructor(private readonly apiRecipesService: ApiRecipesService) {}

  @Get()
  async findMany(
    @Res() response: Response<PageDtoType<RecipesResponseDto> | BaseErrorInterface>,
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
    @Res() response: Response<RecipesResponseDto | BaseErrorInterface>
  ): Promise<void> {
    try {
      const res: RecipesResponseDto = await this.apiRecipesService.getRecipe(uuid);
      response.status(200).send(res);
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }
}
