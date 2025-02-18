import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SubscriptionsUsersEntity } from "../../common/entities/subscriptions-users.entity";

import { SubscriptionsUsersService } from "./subscriptions-users.service";

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionsUsersEntity])],
  providers: [SubscriptionsUsersService],
  controllers: [],
  exports: [SubscriptionsUsersService]
})
export class SubscriptionsUsersModule {}
