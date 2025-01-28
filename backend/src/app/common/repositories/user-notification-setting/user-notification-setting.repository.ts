import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { UserNotificationSettingEntity } from "../../entities/user-notification-setting.entity";

@Injectable()
export class UserNotificationSettingRepository extends Repository<UserNotificationSettingEntity> {
  @InjectRepository(UserNotificationSettingEntity)
  protected readonly portalMessageRepository: Repository<UserNotificationSettingEntity>;

  constructor(manager: EntityManager) {
    super(UserNotificationSettingEntity, manager);
  }

  async findByUuid(userUuid: string): Promise<UserNotificationSettingEntity[]> {
    return await this.find({
      where: {
        userUuid
      }
    });
  }
}
