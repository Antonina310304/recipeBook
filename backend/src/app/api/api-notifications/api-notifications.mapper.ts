import { UserNotificationSettingEntity } from "../../common/entities/user-notification-setting.entity";

import { NotificationsInterface } from "./types";

export class ApiNotificationsMapper {
  static mapUserNotification(source: UserNotificationSettingEntity[]): NotificationsInterface {
    const notification: UserNotificationSettingEntity | undefined = source[0];
    return {
      emailNotification: notification?.email ?? false,
      portalNotification: notification?.portal ?? false
    };
  }
}
