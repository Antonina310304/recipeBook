import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {KitchensService} from "./kitchens.service";
import {KitchensEntity} from "../../common/entities/kitchen.entity";

@Module({
    imports: [TypeOrmModule.forFeature([KitchensEntity])],
    providers: [KitchensService],
    controllers: [],
    exports: [KitchensService]
})
export class KitchensModule {}
