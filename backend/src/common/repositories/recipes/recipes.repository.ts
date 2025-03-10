import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { RecipesEntity } from "../../entities/recipes.entity";

import { CommonProductsCondition, RecipesByPageCondition } from "./types";
import { RecipesResponseDto } from "./dto/response.dto";

@Injectable()
export class RecipesRepository extends Repository<RecipesEntity> {
  @InjectRepository(RecipesEntity)
  protected readonly recipesRepository: Repository<RecipesEntity>;

  private tableName: string = "recipes";

  constructor(manager: EntityManager) {
    super(RecipesEntity, manager);
  }

  async findByUuid(uuid: string): Promise<any> {
    return await this.createQueryBuilder("r")
      .select([
        "title, description, r.uuid",
        "array_agg(json_build_object('productUuid', i.product_uuid, 'count', i.count)) as products"
      ])
      .addSelect("kitchen_uuid", "kitchenUuid")
      .addSelect("user_uuid", "authorUuid")
      .addSelect("nickname", "authorNickname")

      .leftJoin("ingredients", "i", "i.recipe_uuid = r.uuid")
      .leftJoin("users", "u", "r.user_uuid = u.uuid")

      .where("r.uuid = :uuid", { uuid })

      .groupBy("title")

      .addGroupBy("description")
      .addGroupBy("r.uuid")
      .addGroupBy("kitchen_uuid")
      .addGroupBy("user_uuid")
      .addGroupBy("nickname")

      .execute();
  }

  async findByCondition(condition: RecipesByPageCondition): Promise<RecipesResponseDto[]> {
    const where: string[] = this.getWhere({
      authorUuid: condition.authorUuid,
      kitchenUuid: condition.kitchenUuid,
      dateInterval: condition.dateInterval
    });

    return await this.manager.query<RecipesResponseDto[]>(`
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
      OFFSET ${condition.take * (condition.page - 1)};
  `);
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
      where.push(`uuid = '${condition.uuid}'`);
    }

    if (condition.authorUuid) {
      where.push(`user_uuid = '${condition.authorUuid}'`);
    }

    if (condition.kitchenUuid) {
      where.push(`kitchen_uuid = '${condition.kitchenUuid}'`);
    }

    if (condition?.dateInterval?.since) {
      where.push(`date_create >= '${condition.dateInterval.since}'::timestamptz`);
    }
    if (condition?.dateInterval?.until) {
      where.push(`date_create <' ${condition.dateInterval.until}'::timestamptz`);
    }
    return where;
  }
}
