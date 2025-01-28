import { Module } from "@nestjs/common";

import { RecipesModule } from "../../common/repositories/recipes/recipes.module";
import { AuthModule } from "../../auth/auth.module";
import { UsersModule } from "../../common/repositories/users/users.module";

import { ApiRecipesController } from "./api-recipes.controller";
import { ApiRecipesMapper } from "./api-recipes.mapper";
import { ApiRecipesService } from "./api-recipes.service";

@Module({
  imports: [RecipesModule, AuthModule, UsersModule],
  providers: [ApiRecipesMapper, ApiRecipesService],
  controllers: [ApiRecipesController],
  exports: []
})
export class ApiRecipesModule {}
