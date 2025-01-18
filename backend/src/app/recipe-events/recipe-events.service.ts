import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {RecipeEventsEntity} from "../../common/entities/recipe-events.entity";

@Injectable()
export class RecipeEventsService {
    constructor(
        @InjectRepository(RecipeEventsEntity)
        private recipeEventsEntityRepository: Repository<RecipeEventsEntity>,
    ) {}
}