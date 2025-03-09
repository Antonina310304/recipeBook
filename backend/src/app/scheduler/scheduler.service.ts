import { EntityManager } from "typeorm";
import { CronJob } from "cron";
import { SchedulerRegistry } from "@nestjs/schedule";
import { Injectable } from "@nestjs/common";

import { ConfigService } from "../common/config/config.service";
import { SearchService } from "../search/search.service";
import { RecipeSearchEventsRepository } from "../common/repositories/recipe-search-events/recipe-search-events.repository";
import { RecipeSearchEventType } from "../common/types";
import { KeyElasticSearchType } from "../common/config/config.schema";
import {
  BaseRecipesSearchEventResponseDto,
  RecipesSearchEventResponseDto
} from "../common/dto/recipe-search-events/response.dto";

import { SchedulerRecipeMapper } from "./scheduler-recipe.mapper";

@Injectable()
export class SchedulerService {
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly entityManager: EntityManager,
    private readonly configService: ConfigService,
    private readonly searchService: SearchService
  ) {
    const commonSearchTime: string =
      this.configService.elasticSearch.indexes.find((index) => index.name === KeyElasticSearchType.COMMON)
        ?.updateTime ?? "30 * * * * *";

    const updateSearchData: CronJob = new CronJob(commonSearchTime, async (): Promise<void> => {
      await this.updateSearchCommonData();
    });

    this.schedulerRegistry.addCronJob("updateSearchData", updateSearchData);
    updateSearchData.start();
  }

  async updateSearchCommonData(): Promise<void> {
    await this.addNewRecipes();
    await this.refreshRecipes();
    await this.removeRecipes();
  }

  async addNewRecipes(): Promise<void> {
    await this.entityManager.transaction(async (entityManager) => {
      const recipeSearchEventsRepository: RecipeSearchEventsRepository = new RecipeSearchEventsRepository(
        entityManager
      );
      const recipes: RecipesSearchEventResponseDto[] = await recipeSearchEventsRepository.getRecipeByType(
        RecipeSearchEventType.CREATE
      );
      if (!recipes.length) {
        return;
      }

      const schedulerRecipeMapper: SchedulerRecipeMapper = new SchedulerRecipeMapper();

      // создание события
      await this.searchService.createDocument(
        recipes.map((recipe) => schedulerRecipeMapper.mapToElasticSearchDto(recipe)),
        KeyElasticSearchType.COMMON
      );

      // обновляем данных
      await recipeSearchEventsRepository.save(
        recipes.map((recipe) => schedulerRecipeMapper.mapToRefreshEvent(recipe, RecipeSearchEventType.UPDATE))
      );
    });
  }

  async refreshRecipes(): Promise<void> {
    await this.entityManager.transaction(async (entityManager) => {
      const recipeSearchEventsRepository: RecipeSearchEventsRepository = new RecipeSearchEventsRepository(
        entityManager
      );
      const recipes: RecipesSearchEventResponseDto[] = await recipeSearchEventsRepository.getRecipeByType(
        RecipeSearchEventType.UPDATE
      );
      if (!recipes.length) {
        return;
      }
      const schedulerRecipeMapper: SchedulerRecipeMapper = new SchedulerRecipeMapper();
      // создание события
      await this.searchService.updateDocument(
        recipes.map((recipe) => schedulerRecipeMapper.mapToElasticSearchDto(recipe)),
        KeyElasticSearchType.COMMON
      );

      // обновляем данных
      await recipeSearchEventsRepository.save(
        recipes.map((recipe) => schedulerRecipeMapper.mapToRefreshEvent(recipe, RecipeSearchEventType.UPDATE))
      );
    });
  }

  async removeRecipes(): Promise<void> {
    await this.entityManager.transaction(async (entityManager) => {
      const recipeSearchEventsRepository: RecipeSearchEventsRepository = new RecipeSearchEventsRepository(
        entityManager
      );
      const recipes: BaseRecipesSearchEventResponseDto[] = await recipeSearchEventsRepository.getDeletedRecipe();
      if (!recipes.length) {
        return;
      }
      const schedulerRecipeMapper: SchedulerRecipeMapper = new SchedulerRecipeMapper();
      await this.searchService.removeDocument(
        recipes.map((i) => i.recipeUuid),
        KeyElasticSearchType.COMMON
      );

      // обновляем данных
      await recipeSearchEventsRepository.save(
        recipes.map((recipe) => schedulerRecipeMapper.mapToRefreshEvent(recipe, RecipeSearchEventType.REMOVE))
      );
    });
  }
}
