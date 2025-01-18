import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RecipesService} from "./recipes.service";
import {RecipesEntity} from "../../common/entities/recipes.entity";

@Module({
    imports: [TypeOrmModule.forFeature([RecipesEntity])],
    providers: [RecipesService],
    controllers: [],
    exports: [RecipesService]
})
export class RecipesModule {}
