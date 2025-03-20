import { Module } from "@nestjs/common";

import { KitchensModule } from "../../common/repositories/kitchens/kitchens.module";
import { ProductsModule } from "../../common/repositories/products/products.module";

import { ApiGuideController } from "./api-guide.controller";
import { GuideService } from "./guide.service";

@Module({
  imports: [KitchensModule, ProductsModule],
  providers: [GuideService],
  controllers: [ApiGuideController],
  exports: []
})
export class ApiGuideModule {}
