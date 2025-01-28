import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { SubscriptionsUsersEntity } from "../../entities/subscriptions-users.entity";

@Injectable()
export class SubscriptionsUsersRepository extends Repository<SubscriptionsUsersEntity> {
  @InjectRepository(SubscriptionsUsersEntity)
  protected readonly portalMessageRepository: Repository<SubscriptionsUsersEntity>;

  constructor(manager: EntityManager) {
    super(SubscriptionsUsersEntity, manager);
  }
}
