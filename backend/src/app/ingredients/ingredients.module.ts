import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { IngredientsEntity } from "../../common/entities/ingredients.entity";

import { IngredientsService } from "./ingredients.service";

@Module({
  imports: [TypeOrmModule.forFeature([IngredientsEntity])],
  providers: [IngredientsService],
  controllers: [],
  exports: [IngredientsService]
})
export class IngredientsModule {}
