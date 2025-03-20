import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { KitchensEntity } from "../../entities/kitchen.entity";

import { KitchensRepository } from "./kitchens.repository";

@Module({
  imports: [TypeOrmModule.forFeature([KitchensEntity])],
  providers: [KitchensRepository],
  controllers: [],
  exports: [KitchensRepository]
})
export class KitchensModule {}
