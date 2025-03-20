import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { IngredientsEntity } from "../../entities/ingredients.entity";

@Injectable()
export class IngredientsRepository extends Repository<IngredientsEntity> {
  @InjectRepository(IngredientsEntity)
  protected readonly ingredientsRepository: Repository<IngredientsEntity>;

  constructor(manager: EntityManager) {
    super(IngredientsEntity, manager);
  }
}
