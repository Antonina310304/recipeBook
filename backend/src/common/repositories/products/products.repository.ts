import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { ProductsEntity } from "../../entities/products.entity";
import { CommonPageCondition } from "../../types";

@Injectable()
export class ProductsRepository extends Repository<ProductsEntity> {
  @InjectRepository(ProductsEntity)
  protected readonly productsRepository: Repository<ProductsEntity>;

  private tableName: string = "products";

  constructor(manager: EntityManager) {
    super(ProductsEntity, manager);
  }

  async findByCondition(condition: CommonPageCondition): Promise<ProductsEntity[]> {
    return await this.manager.query<ProductsEntity[]>(`
      SELECT
        uuid,
        title,
        unit
      FROM ${this.tableName}
      LIMIT ${condition.pageSize}
      OFFSET ${condition.offset};
  `);
  }

  async getItemCount(): Promise<number> {
    return this.createQueryBuilder("p").getCount();
  }
}
