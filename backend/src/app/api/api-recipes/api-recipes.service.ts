import { ConflictException, Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { RecipesByPageCondition, RecipesResponseInterface } from "../../../common/repositories/recipes/types";
import { RecipesRepository } from "../../../common/repositories/recipes/recipes.repository";
import { PageMetaDto } from "../../../common/dto/page-meta/page-meta.dto";
import { PageDto } from "../../../common/dto/page-dto/page.dto";
import { RecipesEntity } from "../../../common/entities/recipes.entity";
import { IngredientsEntity } from "../../../common/entities/ingredients.entity";
import { IngredientsRepository } from "../../../common/repositories/ingredients/ingredients.repository";
import { UsersEntity } from "../../../common/entities/users.entity";
import { UsersRepository } from "../../../common/repositories/users/users.repository";

import { CreateRecipeData, IngredientsData, RecipeListInterface } from "./types";
import { ApiRecipesMapper } from "./api-recipes.mapper";

@Injectable()
export class ApiRecipesService {
  constructor(
    private readonly recipesRepository: RecipesRepository,
    private readonly ingredientsRepository: RecipesRepository,
    private readonly apiRecipesMapper: ApiRecipesMapper,
    private readonly entityManager: EntityManager,
    private readonly usersRepository: UsersRepository
  ) {}

  async getRecipes(condition: RecipesByPageCondition): Promise<PageDto<RecipeListInterface>> {
    const entities: RecipesResponseInterface[] = await this.recipesRepository.findByCondition(condition);
    const itemCount: number = await this.recipesRepository.getItemCount(condition);

    const response: RecipeListInterface[] = [];

    this.apiRecipesMapper.mapRecipes(entities, response);

    const pageMetaDto: PageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: { page: condition.page, take: condition.take }
    });

    return new PageDto(response, pageMetaDto);
  }

  async removeAllRecipes(userEmail: string): Promise<void> {
    const user: UsersEntity = await this.usersRepository.findByCondition({ userEmail });
    const recipeList: string[] = await this.recipesRepository.getUuidByAuthor(user.uuid);

    await this.entityManager.transaction(async (entityManager) => {
      const recipesRepository: RecipesRepository = new RecipesRepository(entityManager);
      const ingredientsRepository: IngredientsRepository = new IngredientsRepository(entityManager);
      await ingredientsRepository.removeByRecipe(recipeList);
      await recipesRepository.removeByAuthor(user.uuid);
    });
  }

  async getRecipe(uuid: string): Promise<RecipeListInterface> {
    const entity: RecipesResponseInterface[] = await this.recipesRepository.findByUuid(uuid);

    const response: RecipeListInterface[] = [];
    this.apiRecipesMapper.mapRecipes(entity, response);

    return response[0];
  }

  async createIngredients(
    recipeUuid: string,
    ingredients: IngredientsData[],
    ingredientsRepository: IngredientsRepository
  ): Promise<void> {
    const dataToSave: IngredientsEntity[] = [];

    ingredients.forEach((ingredient) => {
      dataToSave.push({
        recipeUuid,
        productUuid: ingredient.productUuid,
        count: ingredient.count
      });
    });

    await ingredientsRepository.save(dataToSave);
  }

  async updateRecipe(recipeUuid: string, userEmail: string, recipe: CreateRecipeData): Promise<void> {
    const user: UsersEntity = await this.usersRepository.findByCondition({ userEmail });
    await this.entityManager.transaction(async (entityManager) => {
      const recipesRepository: RecipesRepository = new RecipesRepository(entityManager);

      await recipesRepository.updateByEntity({
        uuid: recipeUuid,
        userUuid: user.uuid,
        title: recipe.title,
        description: recipe.description,
        kitchenUuid: recipe.kitchenUuid,
        manual: recipe.manual
      });
      // удаляем старый состав рецепта и пересоздаем новый
      const ingredientsRepository: IngredientsRepository = new IngredientsRepository(entityManager);
      await ingredientsRepository.removeByRecipe([recipeUuid]);
      await this.createIngredients(recipeUuid, recipe.products, ingredientsRepository);
    });
  }

  async checkByAuthor(recipeUuid: string, userEmail: string, message: string): Promise<void> {
    const recipeData: RecipesResponseInterface[] = await this.recipesRepository.findByUuid(recipeUuid);
    const user: UsersEntity = await this.usersRepository.findByCondition({ userEmail });
    if (recipeData[0].authorUuid !== user.uuid) {
      throw new ConflictException(message);
    }
  }

  async removeRecipeByUuid(recipeUuid: string): Promise<RecipeListInterface> {
    const recipeData: RecipesResponseInterface[] = await this.recipesRepository.findByUuid(recipeUuid);

    await this.entityManager.transaction(async (entityManager) => {
      const recipesRepository: RecipesRepository = new RecipesRepository(entityManager);
      const ingredientsRepository: IngredientsRepository = new IngredientsRepository(entityManager);

      await ingredientsRepository.removeByRecipe([recipeUuid]);
      await recipesRepository.removeByUuid(recipeUuid);
    });

    const response: RecipeListInterface[] = [];
    this.apiRecipesMapper.mapRecipes(recipeData, response);

    return response[0];
  }

  async createRecipe(userEmail: string, recipe: CreateRecipeData): Promise<RecipesEntity> {
    const user: UsersEntity = await this.usersRepository.findByCondition({ userEmail });
    const entity: RecipesEntity = this.recipesRepository.create({
      uuid: uuidv4(),
      title: recipe.title,
      description: recipe.description,
      kitchenUuid: recipe.kitchenUuid,
      userUuid: user.uuid,
      manual: recipe.manual
    });

    await this.entityManager.transaction(async (entityManager) => {
      const recipesRepository: RecipesRepository = new RecipesRepository(entityManager);
      const ingredientsRepository: IngredientsRepository = new IngredientsRepository(entityManager);
      const responseEntity: RecipesEntity = await recipesRepository.save(entity);
      await this.createIngredients(responseEntity.uuid, recipe.products, ingredientsRepository);
    });

    return entity;
  }
}
