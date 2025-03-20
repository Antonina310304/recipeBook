import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { SubscriptionsKitchenEntity } from "../../entities/subscriptions-kitchen.entity";

@Injectable()
export class SubscriptionsKitchenRepository extends Repository<SubscriptionsKitchenEntity> {
  @InjectRepository(SubscriptionsKitchenEntity)
  protected readonly subscriptionsKitchenRepository: Repository<SubscriptionsKitchenEntity>;

  constructor(manager: EntityManager) {
    super(SubscriptionsKitchenEntity, manager);
  }
}
