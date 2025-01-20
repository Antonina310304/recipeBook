import { Injectable } from "@nestjs/common";

import { PageMetaDto } from "../../common/dto/page-meta/page-meta.dto";
import { PageDto } from "../../common/dto/page-dto/page.dto";
import { KitchensRepository } from "../../common/repositories/kitchens/kitchens.repository";
import { KitchensEntity } from "../../common/entities/kitchen.entity";
import { BaseConditionList } from "../../common/types";
import { ProductsRepository } from "../../common/repositories/products/products.repository";
import { ProductsEntity } from "../../common/entities/products.entity";

@Injectable()
export class GuideService {
  constructor(
    private readonly kitchensRepository: KitchensRepository,
    private readonly productsRepository: ProductsRepository
  ) {}

  async getKitchens(condition: BaseConditionList): Promise<PageDto<KitchensEntity>> {
    const response: KitchensEntity[] = await this.kitchensRepository.findByCondition(condition);
    const itemCount: number = await this.kitchensRepository.getItemCount();

    const pageMetaDto: PageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: { page: condition.page, take: condition.take }
    });

    return new PageDto(response, pageMetaDto);
  }

  async getProducts(condition: BaseConditionList): Promise<PageDto<ProductsEntity>> {
    const response: ProductsEntity[] = await this.productsRepository.findByCondition(condition);
    const itemCount: number = await this.productsRepository.getItemCount();

    const pageMetaDto: PageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: { page: condition.page, take: condition.take }
    });

    return new PageDto(response, pageMetaDto);
  }
}
