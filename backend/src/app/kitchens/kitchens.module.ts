import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { KitchensEntity } from "../../common/entities/kitchen.entity";

import { KitchensService } from "./kitchens.service";

@Module({
  imports: [TypeOrmModule.forFeature([KitchensEntity])],
  providers: [KitchensService],
  controllers: [],
  exports: [KitchensService]
})
export class KitchensModule {}
