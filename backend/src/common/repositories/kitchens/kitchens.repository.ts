import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { KitchensEntity } from "../../entities/kitchen.entity";
import { CommonPageCondition } from "../../types";

@Injectable()
export class KitchensRepository extends Repository<KitchensEntity> {
  @InjectRepository(KitchensEntity)
  protected readonly kitchensRepository: Repository<KitchensEntity>;

  private tableName: string = "kitchens";

  constructor(manager: EntityManager) {
    super(KitchensEntity, manager);
  }

  async findByCondition(condition: CommonPageCondition): Promise<KitchensEntity[]> {
    return await this.manager.query<KitchensEntity[]>(`
      SELECT
        uuid,
        title,
        description
      FROM ${this.tableName}
      LIMIT ${condition.pageSize}
      OFFSET ${condition.offset};
  `);
  }

  async getItemCount(): Promise<number> {
    return this.createQueryBuilder("k").getCount();
  }
}
