import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { SubscriptionsUsersEntity } from "../../entities/subscriptions-users.entity";
import { SubscriptionsUserInfo } from "../../../api/api-subscriptions/types";

@Injectable()
export class SubscriptionsUsersRepository extends Repository<SubscriptionsUsersEntity> {
  @InjectRepository(SubscriptionsUsersEntity)
  protected readonly portalMessageRepository: Repository<SubscriptionsUsersEntity>;

  constructor(manager: EntityManager) {
    super(SubscriptionsUsersEntity, manager);
  }

  async findByUser(userUuid: string): Promise<SubscriptionsUserInfo[]> {
    return await this.manager.query(`
      SELECT uuid, nickName
      FROM ${this.metadata.tableName} AS s
      LEFT JOIN users AS u ON s.user_uuid = u.uuid
      WHERE user_uuid = '${userUuid}'
    `);
  }
}
