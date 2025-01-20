import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { RecipesEntity } from "../../entities/recipes.entity";

import { CommonProductsCondition, RecipesByPageCondition, RecipesResponseInterface } from "./types";

@Injectable()
export class RecipesRepository extends Repository<RecipesEntity> {
  @InjectRepository(RecipesEntity)
  protected readonly recipesRepository: Repository<RecipesEntity>;

  private tableName: string = "recipes";

  constructor(manager: EntityManager) {
    super(RecipesEntity, manager);
  }

  async findByCondition(condition: RecipesByPageCondition): Promise<RecipesResponseInterface[]> {
    const where: string[] = this.getWhere({
      authorUuid: condition.authorUuid,
      kitchenUuid: condition.kitchenUuid,
      dateInterval: condition.dateInterval
    });

    return await this.manager.query<RecipesResponseInterface[]>(`
     SELECT 
        title,
        description,
        kitchen_uuid as "kitchenUuid",
        r.uuid,
        user_uuid as "authorUuid",
        nickname as "authorNickname",
        i.product_uuid as "productUuid",
        i.count as "count"
     FROM ${this.tableName} AS r
     LEFT JOIN ingredients AS i ON r.uuid = i.recipe_uuid
     LEFT JOIN users AS u ON r.user_uuid = u.uuid
        ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
     LIMIT ${condition.take}
     OFFSET ${condition.take * condition.page - 1};`);
  }

  async getItemCount(condition: RecipesByPageCondition): Promise<number> {
    const where: string[] = this.getWhere({
      authorUuid: condition.authorUuid,
      kitchenUuid: condition.kitchenUuid,
      dateInterval: condition.dateInterval
    });
    const itemCount: { count: number }[] = await this.manager.query(`
            SELECT count(uuid) as count 
            FROM ${this.tableName}
            ${where.length ? `WHERE ${where.join(" AND ")}` : ""}; 
        `);

    return Number(itemCount[0].count);
  }

  private getWhere(condition: CommonProductsCondition): string[] {
    const where: string[] = [];

    if (condition.uuid) {
      where.push(`uuid = ${condition.uuid}`);
    }

    if (condition.authorUuid) {
      where.push(`user_uuid = ${condition.authorUuid}`);
    }

    if (condition.kitchenUuid) {
      where.push(`kitchen_uuid = ${condition.authorUuid}`);
    }

    if (condition?.dateInterval?.since) {
      where.push(`dateCreate >= ${condition.dateInterval.since}`);
    }
    if (condition?.dateInterval?.until) {
      where.push(`dateCreate < ${condition.dateInterval.since}`);
    }
    return where;
  }
}
