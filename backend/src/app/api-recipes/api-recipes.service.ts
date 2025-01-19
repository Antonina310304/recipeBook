import {RecipesByPageCondition, RecipesResponseInterface} from "../../common/repository-services/recipes/types";
import {RecipesService} from "../../common/repository-services/recipes/recipes.service";
import {PageMetaDto} from "../../common/dto/page-meta/page-meta.dto";
import {PageDto} from "../../common/dto/page-dto/page.dto";
import {RecipeListInterface} from "./types";
import {ApiRecipesMapper} from "./api-recipes.mapper";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ApiRecipesService {
    constructor(
        private readonly recipesService: RecipesService,
        private readonly apiRecipesMapper: ApiRecipesMapper,
    ) {}

    async getRecipes(condition: RecipesByPageCondition): Promise<PageDto<RecipeListInterface>> {
        const entities: RecipesResponseInterface[] = await this.recipesService.findByCondition(condition)
        const itemCount: number = await this.recipesService.getItemCount(condition)

        const response: RecipeListInterface[] = [];

        this.apiRecipesMapper.mapRecipes(entities, response)

        const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount,
            pageOptionsDto: { page: condition.page, take: condition.take }  });

        return new PageDto(response, pageMetaDto);
    }
}