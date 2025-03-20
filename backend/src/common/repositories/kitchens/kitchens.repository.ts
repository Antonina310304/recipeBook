import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { KitchensEntity } from "../../entities/kitchen.entity";
import { BaseConditionList } from "../../types";

@Injectable()
export class KitchensRepository extends Repository<KitchensEntity> {
  @InjectRepository(KitchensEntity)
  protected readonly kitchensRepository: Repository<KitchensEntity>;

  private tableName: string = "kitchens";

  constructor(manager: EntityManager) {
    super(KitchensEntity, manager);
  }

  async findByCondition(condition: BaseConditionList): Promise<KitchensEntity[]> {
    return await this.manager.query<KitchensEntity[]>(`
      SELECT
        uuid,
        title,
        description
      FROM ${this.tableName}
      LIMIT ${condition.take}
      OFFSET ${condition.take * (condition.page - 1)};
  `);
  }

  async getItemCount(): Promise<number> {
    const itemCount: { count: number }[] = await this.manager.query(`
      SELECT count(uuid) as count 
      FROM ${this.tableName}
    `);
    return Number(itemCount[0].count);
  }
}
