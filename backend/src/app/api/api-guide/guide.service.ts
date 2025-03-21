import { Injectable } from "@nestjs/common";

import { KitchensRepository } from "../../common/repositories/kitchens/kitchens.repository";
import { ProductsRepository } from "../../common/repositories/products/products.repository";
import { KitchensEntity } from "../../common/entities/kitchen.entity";
import { PageDtoType } from "../../common/dto/page-dto/page-dto.type";
import { PageDtoBuilder } from "../../common/dto/page-dto/page-dto.builder";
import { ProductsEntity } from "../../common/entities/products.entity";

@Injectable()
export class GuideService {
  constructor(
    private readonly kitchensRepository: KitchensRepository,
    private readonly productsRepository: ProductsRepository
  ) {}

  async getKitchens(page: string | undefined, pageSize: number): Promise<PageDtoType<KitchensEntity>> {
    const currentPage: number = this.getPage(page);
    const entities: KitchensEntity[] = await this.kitchensRepository.findByCondition({
      pageSize,
      offset: (currentPage - 1) * pageSize
    });
    const itemCount: number = await this.kitchensRepository.getItemCount();

    const builder: PageDtoBuilder<KitchensEntity> = new PageDtoBuilder<KitchensEntity>();

    builder.setItems(entities);
    builder.setMeta(currentPage, pageSize, itemCount);

    return builder.build();
  }

  async getProducts(page: string | undefined, pageSize: number): Promise<PageDtoType<ProductsEntity>> {
    const currentPage: number = this.getPage(page);
    const entities: ProductsEntity[] = await this.productsRepository.findByCondition({
      pageSize,
      offset: (currentPage - 1) * pageSize
    });
    const itemCount: number = await this.productsRepository.getItemCount();

    const builder: PageDtoBuilder<ProductsEntity> = new PageDtoBuilder<ProductsEntity>();
    builder.setItems(entities);
    builder.setMeta(currentPage, pageSize, itemCount);

    return builder.build();
  }

  private getPage(page: string | undefined): number {
    return page ? Number(page) : 1;
  }
}
