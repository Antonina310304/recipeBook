import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { RecipesEntity } from "../../common/entities/recipes.entity";

import { RecipesService } from "./recipes.service";

@Module({
  imports: [TypeOrmModule.forFeature([RecipesEntity])],
  providers: [RecipesService],
  controllers: [],
  exports: [RecipesService]
})
export class RecipesModule {}
