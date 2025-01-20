import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import { Query } from "@nestjs/common/decorators/http/route-params.decorator";

import { PageDto } from "../../common/dto/page-dto/page.dto";
import { CommonErrorBuilder } from "../../common/common-error-builder/common-error-builder";
import { BaseErrorInterface } from "../../common/types";
import { KitchensEntity } from "../../common/entities/kitchen.entity";

import { TAKE_COUNT } from "./constants";
import { GuideService } from "./guide.service";

@Controller("guide")
export class ApiGuideController {
  constructor(private readonly guideService: GuideService) {}

  @Get("/kitchens")
  async getRecipeList(
    @Query("page") page: string,
    @Res() response: Response<PageDto<KitchensEntity> | BaseErrorInterface>
  ): Promise<void> {
    try {
      const res: PageDto<KitchensEntity> = await this.guideService.getKitchens({
        take: TAKE_COUNT,
        page: page ? Number(page) : 1
      });
      response.status(200).send(res);
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }
}
