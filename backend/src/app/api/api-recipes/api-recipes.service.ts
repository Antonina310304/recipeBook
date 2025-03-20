import { Injectable, ConflictException, NotFoundException } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { CommonRecipeCondition } from "../../common/repositories/recipes/types";
import { RecipesRepository } from "../../common/repositories/recipes/recipes.repository";
import { RecipesEntity } from "../../common/entities/recipes.entity";
import { IngredientsEntity } from "../../common/entities/ingredients.entity";
import { IngredientsRepository } from "../../common/repositories/ingredients/ingredients.repository";
import { UsersEntity } from "../../common/entities/users.entity";
import { UsersRepository } from "../../common/repositories/users/users.repository";
import { PageDtoType } from "../../common/dto/page-dto/page-dto.type";
import { PageDtoBuilder } from "../../common/dto/page-dto/page-dto.builder";

import { CreateRecipeData, IngredientsData, RecipesResponseDto } from "./dto/response.dto";
import { RequestRecipeDto } from "./dto/request.dto";

@Injectable()
export class ApiRecipesService {
  constructor(
    private readonly recipesRepository: RecipesRepository,
    private readonly ingredientsRepository: RecipesRepository,
    private readonly entityManager: EntityManager,
    private readonly usersRepository: UsersRepository
  ) {}

  async getRecipes(condition: RequestRecipeDto, pageSize: number): Promise<PageDtoType<RecipesResponseDto>> {
    const recipeCondition: CommonRecipeCondition = {
      authorUuid: condition.author,
      kitchenUuid: condition.kitchen,
      dateInterval: {
        since: condition.since,
        until: condition.until
      }
    };
    const entities: RecipesResponseDto[] = await this.recipesRepository.findMany({
      ...recipeCondition,
      offset: (condition.page - 1) * pageSize,
      pageSize: pageSize
    });
    const itemCount: number = await this.recipesRepository.getItemCount(recipeCondition);

    const builder: PageDtoBuilder<RecipesResponseDto> = new PageDtoBuilder<RecipesResponseDto>();

    builder.setItems(entities);
    builder.setMeta(condition.page, pageSize, itemCount);

    return builder.build();
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

  async getRecipe(uuid: string): Promise<RecipesResponseDto> {
    const recipeEntity: RecipesResponseDto | undefined = await this.recipesRepository.findByUuid(uuid);
    if (!recipeEntity) {
      throw new NotFoundException(uuid);
    }

    return recipeEntity;
  }

  async saveIngredients(
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
      await this.saveIngredients(recipeUuid, recipe.products, ingredientsRepository);
    });
  }

  async checkByAuthor(recipeUuid: string, userEmail: string, message: string): Promise<void> {
    const recipeEntity: RecipesResponseDto | undefined = await this.recipesRepository.findByUuid(recipeUuid);
    if (!recipeEntity) {
      throw new NotFoundException(recipeUuid);
    }

    const user: UsersEntity = await this.usersRepository.findByCondition({ userEmail });
    if (recipeEntity.authorUuid !== user.uuid) {
      throw new ConflictException(message);
    }
  }

  async removeRecipeByUuid(recipeUuid: string): Promise<RecipesResponseDto> {
    const recipeEntity: RecipesResponseDto = await this.recipesRepository.findByUuid(recipeUuid);
    if (!recipeEntity) {
      throw new NotFoundException(recipeUuid);
    }

    await this.entityManager.transaction(async (entityManager) => {
      const recipesRepository: RecipesRepository = new RecipesRepository(entityManager);
      const ingredientsRepository: IngredientsRepository = new IngredientsRepository(entityManager);

      await ingredientsRepository.removeByRecipe([recipeUuid]);
      await recipesRepository.removeByUuid(recipeUuid);
    });

    return recipeEntity;
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
      await this.saveIngredients(responseEntity.uuid, recipe.products, ingredientsRepository);
    });

    return entity;
  }
}
