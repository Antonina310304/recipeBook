import { Module } from "@nestjs/common";

import { AuthModule } from "../../auth/auth.module";
import { UserNotificationSettingModule } from "../../common/repositories/user-notification-setting/user-notification-setting.module";
import { UsersModule } from "../../common/repositories/users/users.module";

import { ApiNotificationsService } from "./api-notifications.service";
import { ApiNotificationsController } from "./api-notifications.controller";

@Module({
  imports: [AuthModule, UserNotificationSettingModule, UsersModule],
  providers: [ApiNotificationsService],
  controllers: [ApiNotificationsController],
  exports: []
})
export class ApiNotificationsModule {}
