import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { RecipeEventsEntity } from "../../common/entities/recipe-events.entity";

import { RecipeEventsService } from "./recipe-events.service";

@Module({
  imports: [TypeOrmModule.forFeature([RecipeEventsEntity])],
  providers: [RecipeEventsService],
  controllers: [],
  exports: [RecipeEventsService]
})
export class RecipeEventsModule {}
