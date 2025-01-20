import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { RecipesEntity } from "../../common/entities/recipes.entity";

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(RecipesEntity)
    private recipesRepository: Repository<RecipesEntity>
  ) {}
}
