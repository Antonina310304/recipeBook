import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import { Query } from "@nestjs/common/decorators/http/route-params.decorator";

import { CommonErrorBuilder } from "../../../common/common-error-builder/common-error-builder";
import { KitchensEntity } from "../../../common/entities/kitchen.entity";
import { ProductsEntity } from "../../../common/entities/products.entity";
import { ErrorDescription } from "../../../common/common-error-builder/types";
import { PAGE_SIZE } from "../api-recipes/constants";
import { PageDtoType } from "../../../common/dto/page-dto/page-dto.type";

import { GuideService } from "./guide.service";

@Controller("guide")
export class ApiGuideController {
  constructor(private readonly guideService: GuideService) {}

  @Get("/kitchens")
  async getRecipeList(
    @Query("page") page: string,
    @Res() response: Response<PageDtoType<KitchensEntity> | ErrorDescription>
  ): Promise<void> {
    try {
      const res: PageDtoType<KitchensEntity> = await this.guideService.getKitchens(page, PAGE_SIZE);
      response.status(200).send(res);
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }

  @Get("/products")
  async getProductList(
    @Query("page") page: string,
    @Res() response: Response<PageDtoType<ProductsEntity> | ErrorDescription>
  ): Promise<void> {
    try {
      const res: PageDtoType<ProductsEntity> = await this.guideService.getProducts(page, PAGE_SIZE);
      response.status(200).send(res);
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }
}
