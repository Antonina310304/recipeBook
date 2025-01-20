import { Module } from "@nestjs/common";

import { KitchensModule } from "../../common/repositories/kitchens/kitchens.module";

import { ApiGuideController } from "./api-guide.controller";
import { GuideService } from "./guide.service";

@Module({
  imports: [KitchensModule],
  providers: [GuideService],
  controllers: [ApiGuideController],
  exports: []
})
export class ApiGuideModule {}
