import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RecipeEventsService} from "./recipe-events.service";
import {RecipeEventsEntity} from "../../entities/recipe-events.entity";

@Module({
    imports: [TypeOrmModule.forFeature([RecipeEventsEntity])],
    providers: [RecipeEventsService],
    controllers: [],
    exports: [RecipeEventsService]
})
export class RecipeEventsModule {}
