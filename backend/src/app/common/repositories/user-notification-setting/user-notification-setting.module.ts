import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserNotificationSettingRepository } from "./user-notification-setting.repository";

@Module({
  imports: [TypeOrmModule.forFeature([UserNotificationSettingRepository])],
  providers: [UserNotificationSettingRepository],
  controllers: [],
  exports: [UserNotificationSettingRepository]
})
export class UserNotificationSettingModule {}
