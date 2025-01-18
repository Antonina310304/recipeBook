import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductsService} from "./products.service";
import {ProductsEntity} from "../../common/entities/products.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ProductsEntity])],
    providers: [ProductsService],
    controllers: [],
    exports: [ProductsService]
})
export class ProductsModule {}
