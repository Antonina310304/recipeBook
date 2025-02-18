import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IngredientsEntity } from "../../common/entities/ingredients.entity";

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(IngredientsEntity)
    private ingredientsRepository: Repository<IngredientsEntity>
  ) {}
}
