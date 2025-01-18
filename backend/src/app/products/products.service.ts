import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {ProductsEntity} from "../../common/entities/products.entity";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductsEntity)
        private productsRepository: Repository<ProductsEntity>,
    ) {}
}