import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { RecipeEventsEntity } from "../../entities/recipe-events.entity";

@Injectable()
export class RecipeEventsRepository extends Repository<RecipeEventsEntity> {
  @InjectRepository(RecipeEventsEntity)
  protected readonly recipeRepository: Repository<RecipeEventsEntity>;

  constructor(manager: EntityManager) {
    super(RecipeEventsEntity, manager);
  }
}
