import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { RecipeEventsEntity } from "../../entities/recipe-events.entity";

import { RecipeSearchEventsRepository } from "./recipe-search-events.repository";

@Module({
  imports: [TypeOrmModule.forFeature([RecipeEventsEntity])],
  providers: [RecipeSearchEventsRepository],
  controllers: [],
  exports: [RecipeSearchEventsRepository]
})
export class RecipeSearchEventsModule {}
