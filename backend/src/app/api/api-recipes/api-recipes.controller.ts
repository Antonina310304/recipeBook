import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { Query } from "@nestjs/common/decorators/http/route-params.decorator";

import { PageDto } from "../../common/dto/page-dto/page.dto";
import { CommonErrorBuilder } from "../../common/common-error-builder/common-error-builder";
import { ErrorDescription } from "../../common/common-error-builder/types";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { UserInterface } from "../../common/types";
import { AuthGuard } from "../../auth/auth.guard";
import { RecipesEntity } from "../../common/entities/recipes.entity";

import { ApiRecipesService } from "./api-recipes.service";
import { CreateRecipeData, RecipeListInterface } from "./types";
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
    @Res() response: Response<PageDto<RecipeListInterface> | ErrorDescription>
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

  @Get(`/:uuid`)
  async getRecipeByUuid(
    @Param("uuid") uuid: string,
    @Res() response: Response<RecipeListInterface | ErrorDescription>
  ): Promise<void> {
    try {
      const res: RecipeListInterface = await this.apiRecipesService.getRecipe(uuid);
      response.status(200).send(res);
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  async createRecipe(
    @Body() body: CreateRecipeData,
    @CurrentUser() { email }: UserInterface,
    @Res() response: Response<RecipeListInterface | ErrorDescription>
  ): Promise<void> {
    try {
      const entity: RecipesEntity = await this.apiRecipesService.createRecipe(email, body);
      const res: RecipeListInterface = await this.apiRecipesService.getRecipe(entity.uuid);
      response.status(200).send(res);
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }

  @Put("/:uuid")
  @UseGuards(AuthGuard)
  async updateRecipe(
    @Param("uuid") uuid: string,
    @Body() body: CreateRecipeData,
    @CurrentUser() { email }: UserInterface,
    @Res() response: Response<RecipeListInterface | ErrorDescription>
  ): Promise<void> {
    try {
      await this.apiRecipesService.checkByAuthor(uuid, email, "Редактировать рецепт может только его автор");
      await this.apiRecipesService.updateRecipe(uuid, email, body);
      const res: RecipeListInterface = await this.apiRecipesService.getRecipe(uuid);
      response.status(200).send(res);
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }

  @Delete("/:uuid")
  @UseGuards(AuthGuard)
  async removeRecipe(
    @Param("uuid") uuid: string,
    @CurrentUser() { email }: UserInterface,
    @Res() response: Response<RecipeListInterface | ErrorDescription>
  ): Promise<void> {
    try {
      await this.apiRecipesService.checkByAuthor(uuid, email, "Удалить рецепт может только его автор");
      const entity: RecipeListInterface = await this.apiRecipesService.removeRecipeByUuid(uuid);
      response.status(200).send(entity);
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }

  @Delete()
  @UseGuards(AuthGuard)
  async removeAllRecipes(
    @CurrentUser() { email }: UserInterface,
    @Res() response: Response<RecipeListInterface | ErrorDescription>
  ): Promise<void> {
    try {
      await this.apiRecipesService.removeAllRecipes(email);
      response.status(204).send();
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }
}
