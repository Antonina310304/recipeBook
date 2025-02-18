import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SubscriptionsKitchenEntity } from "../../common/entities/subscriptions-kitchen.entity";

import { SubscriptionsKitchenService } from "./subscriptions-kitchen.service";

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionsKitchenEntity])],
  providers: [SubscriptionsKitchenService],
  controllers: [],
  exports: [SubscriptionsKitchenService]
})
export class SubscriptionsKitchenModule {}
