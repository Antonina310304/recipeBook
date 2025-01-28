import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { RecipesEntity } from "../../entities/recipes.entity";

import { RecipesRepository } from "./recipes.repository";

@Module({
  imports: [TypeOrmModule.forFeature([RecipesEntity])],
  providers: [RecipesRepository],
  controllers: [],
  exports: [RecipesRepository]
})
export class RecipesModule {}
