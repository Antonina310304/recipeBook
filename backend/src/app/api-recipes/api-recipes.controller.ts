import { Controller, Get, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { Query } from "@nestjs/common/decorators/http/route-params.decorator";

import { PageDto } from "../../common/dto/page-dto/page.dto";
import { CommonErrorBuilder } from "../../common/common-error-builder/common-error-builder";
import { BaseErrorInterface } from "../../common/types";

import { ApiRecipesService } from "./api-recipes.service";
import { RecipeListInterface } from "./types";
import { TAKE_COUNT } from "./constants";

@Controller("recipes")
export class ApiRecipesController {
  constructor(private readonly apiRecipesService: ApiRecipesService) {}

  @Get()
  async getRecipeList(
    @Query("author") author: string,
    @Query("kitchen") kitchen: string,
    @Query("since") since: string,
    @Query("until") until: string,
    @Query("page") page: string,
    @Res() response: Response<PageDto<RecipeListInterface> | BaseErrorInterface>
  ): Promise<void> {
    try {
      const res: PageDto<RecipeListInterface> = await this.apiRecipesService.getRecipes({
        take: TAKE_COUNT,
        page: page ? Number(page) : 1,
        authorUuid: author,
        kitchenUuid: kitchen,
        dateInterval: {
          since,
          until
        }
      });
      response.status(200).send(res);
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }
}
