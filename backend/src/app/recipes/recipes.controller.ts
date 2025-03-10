import { Controller, Get, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { Query } from "@nestjs/common/decorators/http/route-params.decorator";

import { BaseErrorInterface } from "../../common/types";
import { CommonErrorBuilder } from "../../common/common-error-builder/common-error-builder";
import { PageDtoType } from "../../common/dto/page-dto/page-dto.type";
import { QueryTransformPipe } from "../../common/pipes/query-transform.pipe";

import { RecipesService } from "./recipes.service";
import { PAGE_SIZE } from "./constants";
import { RequestRecipeDtoDto } from "./dto/request.dto";
import { RecipeListResponseDto } from "./dto/response.dto";

@Controller("recipes")
export class RecipesController {
  constructor(private readonly apiRecipesService: RecipesService) {}

  @Get()
  async findMany(
    @Res() response: Response<PageDtoType<RecipeListResponseDto> | BaseErrorInterface>,
    @Query(new QueryTransformPipe<RequestRecipeDtoDto>()) query?: RequestRecipeDtoDto
  ): Promise<void> {
    try {
      const res: PageDtoType<RecipeListResponseDto> = await this.apiRecipesService.getRecipes({
        take: PAGE_SIZE,
        page: query.page ? Number(query.page) : 1,
        authorUuid: query.author,
        kitchenUuid: query.kitchen,
        dateInterval: {
          since: query.since,
          until: query.until
        }
      });
      response.status(200).send(res);
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }

  @Get(`/:uuid`)
  async findOne(
    @Param("uuid") uuid: string,
    @Res() response: Response<RecipeListResponseDto | BaseErrorInterface>
  ): Promise<void> {
    try {
      const res: RecipeListResponseDto = await this.apiRecipesService.getRecipe(uuid);
      response.status(200).send(res);
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }
}
