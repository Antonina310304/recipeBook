import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {RecipeEventsEntity} from "../../entities/recipe-events.entity";

@Injectable()
export class RecipeEventsService {
    constructor(
        @InjectRepository(RecipeEventsEntity)
        private recipeEventsRepository: Repository<RecipeEventsEntity>,
    ) {}
}