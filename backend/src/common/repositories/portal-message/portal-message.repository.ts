import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { PortalMessageEntity } from "../../entities/portal-message.entity";

@Injectable()
export class PortalMessageRepository extends Repository<PortalMessageEntity> {
  @InjectRepository(PortalMessageEntity)
  protected readonly portalMessageRepository: Repository<PortalMessageEntity>;

  constructor(manager: EntityManager) {
    super(PortalMessageEntity, manager);
  }
}
