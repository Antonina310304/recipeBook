import { Module } from "@nestjs/common";

import { RecipesModule } from "../../common/repositories/recipes/recipes.module";
import { AuthModule } from "../../auth/auth.module";
import { UsersModule } from "../../common/repositories/users/users.module";
import { RecipeEventsModule } from "../../common/repositories/recipe-events/recipe-events.module";
import { SearchModule } from "../../search/search.module";

import { ApiRecipesController } from "./api-recipes.controller";
import { ApiRecipesMapper } from "./api-recipes.mapper";
import { ApiRecipesService } from "./api-recipes.service";

@Module({
  imports: [RecipesModule, AuthModule, UsersModule, RecipeEventsModule, SearchModule],
  providers: [ApiRecipesMapper, ApiRecipesService],
  controllers: [ApiRecipesController],
  exports: []
})
export class ApiRecipesModule {}
