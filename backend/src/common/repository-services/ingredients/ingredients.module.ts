import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {IngredientsService} from "./ingredients.service";
import {IngredientsEntity} from "../../entities/ingredients.entity";

@Module({
    imports: [TypeOrmModule.forFeature([IngredientsEntity])],
    providers: [IngredientsService],
    controllers: [],
    exports: [IngredientsService]
})
export class IngredientsModule {}
