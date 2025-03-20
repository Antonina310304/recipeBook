import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { ProductsEntity } from "../../entities/products.entity";

@Injectable()
export class ProductsRepository extends Repository<ProductsEntity> {
  @InjectRepository(ProductsEntity)
  protected readonly productsRepository: Repository<ProductsEntity>;

  constructor(manager: EntityManager) {
    super(ProductsEntity, manager);
  }
}
