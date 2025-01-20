import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductsEntity } from "../../entities/products.entity";

import { ProductsRepository } from "./products.repository";

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity])],
  providers: [ProductsRepository],
  controllers: [],
  exports: [ProductsRepository]
})
export class ProductsModule {}
