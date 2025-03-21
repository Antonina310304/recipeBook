import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { RecipeEventsEntity } from "../../entities/recipe-events.entity";
import { RecipeForSearch } from "../recipe-search-events/types";

@Injectable()
export class RecipeEventsRepository extends Repository<RecipeEventsEntity> {
  @InjectRepository(RecipeEventsEntity)
  protected readonly recipeRepository: Repository<RecipeEventsEntity>;

  constructor(manager: EntityManager) {
    super(RecipeEventsEntity, manager);
  }

  async getRecipeForSearch(): Promise<RecipeForSearch[]> {
    return await this.manager.query(`
      SELECT re.uuid,
         r.title,
         description,
         array_agg(p.title) as products
      FROM ${this.metadata.tableName} AS re
       LEFT JOIN recipes AS r ON re.recipe_uuid = r.uuid
       LEFT JOIN ingredients AS i ON re.recipe_uuid = i.recipe_uuid
       LEFT JOIN products AS p ON p.uuid = i.product_uuid
      WHERE  parsed_search = 'false'
      GROUP BY re.uuid, r.title, description
    `);
  }
}
