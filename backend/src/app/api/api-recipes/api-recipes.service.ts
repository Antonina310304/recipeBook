import { Injectable } from "@nestjs/common";
import { EntityManager, Repository } from "typeorm";
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

  async getRecipe(uuid: string): Promise<RecipeListInterface> {
    const entity: RecipesResponseInterface[] = await this.recipesRepository.findByUuid(uuid);

    const response: RecipeListInterface[] = [];
    this.apiRecipesMapper.mapRecipes(entity, response);

    return response[0];
  }

  async createIngredients(
    recipeUuid: string,
    ingredients: IngredientsData[],
    entityManager: EntityManager
  ): Promise<void> {
    const ingredientsRepository: Repository<IngredientsEntity> = new IngredientsRepository(entityManager);
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

      const responseEntity: RecipesEntity = await recipesRepository.save(entity);
      await this.createIngredients(responseEntity.uuid, recipe.products, entityManager);
    });

    return entity;
  }
}
