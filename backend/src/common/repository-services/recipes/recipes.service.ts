import {RecipesEntity} from "../../entities/recipes.entity";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class RecipesService {
    constructor(
        @InjectRepository(RecipesEntity)
        private recipesRepository: Repository<RecipesEntity>,
    ) {}
}