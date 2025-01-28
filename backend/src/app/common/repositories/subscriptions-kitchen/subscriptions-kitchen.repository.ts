import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { SubscriptionsKitchenEntity } from "../../entities/subscriptions-kitchen.entity";
import { SubscriptionsKitchenInfo } from "../../../api/api-subscriptions/types";

@Injectable()
export class SubscriptionsKitchenRepository extends Repository<SubscriptionsKitchenEntity> {
  @InjectRepository(SubscriptionsKitchenEntity)
  protected readonly subscriptionsKitchenRepository: Repository<SubscriptionsKitchenEntity>;

  constructor(manager: EntityManager) {
    super(SubscriptionsKitchenEntity, manager);
  }

  async findByUser(userUuid: string): Promise<SubscriptionsKitchenInfo[]> {
    return await this.manager.query(`
      SELECT k.uuid, k.title, k.description
      FROM ${this.metadata.tableName} AS s
      LEFT JOIN kitchens AS k ON s.kitchen_uuid = k.uuid
      WHERE user_uuid = '${userUuid}'
    `);
  }
}
