import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { RecipeEventsEntity } from "../../entities/recipe-events.entity";

import { RecipeEventsRepository } from "./recipe-events.repository";

@Module({
  imports: [TypeOrmModule.forFeature([RecipeEventsEntity])],
  providers: [RecipeEventsRepository],
  controllers: [],
  exports: [RecipeEventsRepository]
})
export class RecipeEventsModule {}
