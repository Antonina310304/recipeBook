import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { ProductsEntity } from "../../entities/products.entity";
import { BaseConditionList } from "../../types";

@Injectable()
export class ProductsRepository extends Repository<ProductsEntity> {
  @InjectRepository(ProductsEntity)
  protected readonly productsRepository: Repository<ProductsEntity>;

  private tableName: string = "products";

  constructor(manager: EntityManager) {
    super(ProductsEntity, manager);
  }

  async findByCondition(condition: BaseConditionList): Promise<ProductsEntity[]> {
    return await this.manager.query<ProductsEntity[]>(`
      SELECT
        uuid,
        title,
        unit
      FROM ${this.tableName}
      LIMIT ${condition.take}
      OFFSET ${condition.take * (condition.page - 1)};
  `);
  }

  async getItemCount(): Promise<number> {
    const itemCount: { count: number }[] = await this.manager.query(`
      SELECT count(uuid) as count 
      FROM ${this.tableName}
    `);
    return Number(itemCount[0].count);
  }
}
