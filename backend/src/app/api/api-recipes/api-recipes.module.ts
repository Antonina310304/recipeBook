import { Module } from "@nestjs/common";

import { RecipesModule } from "../../../common/repositories/recipes/recipes.module";

import { ApiRecipesController } from "./api-recipes.controller";
import { ApiRecipesService } from "./api-recipes.service";

@Module({
  imports: [RecipesModule],
  providers: [ApiRecipesService],
  controllers: [ApiRecipesController],
  exports: []
})
export class ApiRecipesModule {}
