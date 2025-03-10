import { Module } from "@nestjs/common";

import { RecipesModule } from "../../common/repositories/recipes/recipes.module";

import { RecipesController } from "./recipes.controller";
import { RecipesMapper } from "./recipes.mapper";
import { RecipesService } from "./recipes.service";

@Module({
  imports: [RecipesModule],
  providers: [RecipesMapper, RecipesService],
  controllers: [RecipesController],
  exports: []
})
export class ApiRecipesModule {}
