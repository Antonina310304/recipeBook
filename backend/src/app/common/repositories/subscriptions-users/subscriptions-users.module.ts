import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SubscriptionsUsersEntity } from "../../entities/subscriptions-users.entity";

import { SubscriptionsUsersRepository } from "./subscriptions-users.repository";

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionsUsersEntity])],
  providers: [SubscriptionsUsersRepository],
  controllers: [],
  exports: [SubscriptionsUsersRepository]
})
export class SubscriptionsUsersModule {}
