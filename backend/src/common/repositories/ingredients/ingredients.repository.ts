import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { IngredientsEntity } from "../../entities/ingredients.entity";

@Injectable()
export class IngredientsRepository extends Repository<IngredientsEntity> {
  @InjectRepository(IngredientsEntity)
  protected readonly ingredientsRepository: Repository<IngredientsEntity>;

  private tableName: string = "ingredients";

  constructor(manager: EntityManager) {
    super(IngredientsEntity, manager);
  }

  async removeByRecipe(recipeUuid: string): Promise<void> {
    await this.manager.query(`
        DELETE
        FROM ${this.tableName}
        WHERE recipe_uuid = '${recipeUuid}'
    `);
  }
}
