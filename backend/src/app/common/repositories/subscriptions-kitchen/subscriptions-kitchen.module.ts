import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SubscriptionsKitchenEntity } from "../../entities/subscriptions-kitchen.entity";

import { SubscriptionsKitchenRepository } from "./subscriptions-kitchen.repository";

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionsKitchenEntity])],
  providers: [SubscriptionsKitchenRepository],
  controllers: [],
  exports: [SubscriptionsKitchenRepository]
})
export class SubscriptionsKitchenModule {}
