import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductsEntity } from "../../common/entities/products.entity";

import { ProductsService } from "./products.service";

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity])],
  providers: [ProductsService],
  controllers: [],
  exports: [ProductsService]
})
export class ProductsModule {}
