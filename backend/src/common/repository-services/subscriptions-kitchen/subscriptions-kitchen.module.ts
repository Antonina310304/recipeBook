import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SubscriptionsKitchenService} from "./subscriptions-kitchen.service";
import {SubscriptionsKitchenEntity} from "../../entities/subscriptions-kitchen.entity";

@Module({
    imports: [TypeOrmModule.forFeature([SubscriptionsKitchenEntity])],
    providers: [SubscriptionsKitchenService],
    controllers: [],
    exports: [SubscriptionsKitchenService]
})
export class SubscriptionsKitchenModule {}
