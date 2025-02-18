import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserNotificationSettingEntity } from "../../common/entities/user-notification-setting.entity";

import { SubscriptionsUsersService } from "./subscriptions-users.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserNotificationSettingEntity])],
  providers: [SubscriptionsUsersService],
  controllers: [],
  exports: [SubscriptionsUsersService]
})
export class SubscriptionsUsersModule {}
