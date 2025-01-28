import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { IngredientsEntity } from "../../entities/ingredients.entity";

import { IngredientsRepository } from "./ingredients.repository";

@Module({
  imports: [TypeOrmModule.forFeature([IngredientsEntity])],
  providers: [IngredientsRepository],
  controllers: [],
  exports: [IngredientsRepository]
})
export class IngredientsModule {}
