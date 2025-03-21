import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { RecipeSearchEventsEntity } from "../../entities/recipe-search-events.entity";
import { RecipeSearchEventType } from "../../types";
import {
  BaseRecipesSearchEventResponseDto,
  RecipesSearchEventResponseDto
} from "../../dto/recipe-search-events/response.dto";

@Injectable()
export class RecipeSearchEventsRepository extends Repository<RecipeSearchEventsEntity> {
  @InjectRepository(RecipeSearchEventsEntity)
  protected readonly recipeRepository: Repository<RecipeSearchEventsEntity>;

  constructor(manager: EntityManager) {
    super(RecipeSearchEventsEntity, manager);
  }

  async getRecipeByType(eventType: RecipeSearchEventType): Promise<RecipesSearchEventResponseDto[]> {
    return await this.manager.query(`
      SELECT 
         re.uuid,
         re.recipe_uuid as "recipeUuid",
         r.title,
         description,
         array_agg(p.title) as products
      FROM ${this.metadata.tableName} AS re
       LEFT JOIN recipes AS r ON re.recipe_uuid = r.uuid
       LEFT JOIN ingredients AS i ON re.recipe_uuid = i.recipe_uuid
       LEFT JOIN products AS p ON p.uuid = i.product_uuid
      WHERE  parsed = 'false' AND event_type = '${eventType}'
      GROUP BY re.uuid, re.recipe_uuid, r.title, description
    `);
  }

  async getDeletedRecipe(): Promise<BaseRecipesSearchEventResponseDto[]> {
    return await this.manager.query(`
      SELECT 
         re.uuid,
         re.recipe_uuid as "recipeUuid"
      FROM ${this.metadata.tableName} AS re
       LEFT JOIN recipes AS r ON re.recipe_uuid = r.uuid
       LEFT JOIN ingredients AS i ON re.recipe_uuid = i.recipe_uuid
       LEFT JOIN products AS p ON p.uuid = i.product_uuid
      WHERE  parsed = 'false' AND event_type = '${RecipeSearchEventType.REMOVE}'
      GROUP BY re.uuid, re.recipe_uuid
    `);
  }
}
