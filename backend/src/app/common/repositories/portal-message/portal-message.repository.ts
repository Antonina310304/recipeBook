import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { PortalMessageEntity } from "../../entities/portal-message.entity";
import { NotificationEvents } from "../../../api/api-notifications/types";

@Injectable()
export class PortalMessageRepository extends Repository<PortalMessageEntity> {
  @InjectRepository(PortalMessageEntity)
  protected readonly portalMessageRepository: Repository<PortalMessageEntity>;

  constructor(manager: EntityManager) {
    super(PortalMessageEntity, manager);
  }

  async getEventsByUserUuid(uuid: string): Promise<NotificationEvents[]> {
    return await this.manager.query<NotificationEvents[]>(`
      SELECT
        recipe_uuid as "recipeUuid",
        r.title,
        r.description,
        parsed
      FROM ${this.metadata.tableName} AS e
      LEFT JOIN recipes AS r ON e.recipe_uuid = r.uuid
      WHERE e.user_uuid = '${uuid}'
    `);
  }
}
