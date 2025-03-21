import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserNotificationSettingEntity } from "../../entities/user-notification-setting.entity";

import { UserNotificationSettingRepository } from "./user-notification-setting.repository";

@Module({
  imports: [TypeOrmModule.forFeature([UserNotificationSettingEntity])],
  providers: [UserNotificationSettingRepository],
  controllers: [],
  exports: [UserNotificationSettingRepository]
})
export class UserNotificationSettingModule {}
