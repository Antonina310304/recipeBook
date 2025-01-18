import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {SubscriptionsKitchenEntity} from "../../common/entities/subscriptions-kitchen.entity";

@Injectable()
export class SubscriptionsKitchenService {
    constructor(
        @InjectRepository(SubscriptionsKitchenEntity)
        private subscriptionsKitchenRepository: Repository<SubscriptionsKitchenEntity>,
    ) {}
}