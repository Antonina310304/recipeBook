import { Injectable } from "@nestjs/common";

import { UserNotificationSettingRepository } from "../../common/repositories/user-notification-setting/user-notification-setting.repository";
import { UsersRepository } from "../../common/repositories/users/users.repository";
import { UsersEntity } from "../../common/entities/users.entity";
import { UserNotificationSettingEntity } from "../../common/entities/user-notification-setting.entity";

import { NotificationsInterface } from "./types";
import { ApiNotificationsMapper } from "./api-notifications.mapper";

@Injectable()
export class ApiNotificationsService {
  constructor(
    private readonly userNotificationSettingRepository: UserNotificationSettingRepository,
    private readonly usersRepository: UsersRepository
  ) {}

  async getNotifications(userEmail: string): Promise<NotificationsInterface> {
    const user: UsersEntity = await this.usersRepository.findByCondition({ userEmail });

    const notificationList: UserNotificationSettingEntity[] = await this.userNotificationSettingRepository.findByUuid(
      user.uuid
    );
    return ApiNotificationsMapper.mapUserNotification(notificationList);
  }

  async updateNotification(userEmail: string, notification: NotificationsInterface): Promise<void> {
    const user: UsersEntity = await this.usersRepository.findByCondition({ userEmail });
    await this.userNotificationSettingRepository.save({
      userUuid: user.uuid,
      email: notification.emailNotification,
      portal: notification.portalNotification
    });
  }
}
