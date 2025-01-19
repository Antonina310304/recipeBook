import { Module } from '@nestjs/common';

import {RecipesModule} from "../../common/repository-services/recipes/recipes.module";
import {ApiRecipesController} from "./api-recipes.controller";
import {ApiRecipesMapper} from "./api-recipes.mapper";
import {ApiRecipesService} from "./api-recipes.service";

@Module({
    imports: [RecipesModule],
    providers: [ApiRecipesMapper, ApiRecipesService],
    controllers: [ApiRecipesController],
    exports: []
})
export class ApiRecipesModule {}
