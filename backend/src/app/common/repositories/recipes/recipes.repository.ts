import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, FindOptionsWhere, Repository } from "typeorm";
import { SelectQueryBuilder } from "typeorm/query-builder/SelectQueryBuilder";

import { RecipesEntity } from "../../entities/recipes.entity";
import { RecipesResponseDto } from "../../../api/api-recipes/dto/response.dto";

import { RecipesCommonCondition, CommonRecipeCondition, UpdateRecipeInterface, UuidListInterface } from "./types";

@Injectable()
export class RecipesRepository extends Repository<RecipesEntity> {
  @InjectRepository(RecipesEntity)
  protected readonly recipesRepository: Repository<RecipesEntity>;

  constructor(manager: EntityManager) {
    super(RecipesEntity, manager);
  }

  async removeByUuid(recipeUuid: string): Promise<void> {
    await this.manager.query(`
        DELETE
        FROM ${this.metadata.tableName}
        WHERE uuid = '${recipeUuid}'
    `);
  }

  async removeByAuthor(userUuid: string): Promise<void> {
    await this.manager.query(`
        DELETE
        FROM ${this.metadata.tableName}
        WHERE user_uuid = '${userUuid}'
    `);
  }

  async findByUuid(recipeUuid: string[]): Promise<RecipesResponseDto | undefined> {
    const response: RecipesResponseDto[] = await this.findByCondition({ recipeUuid });
    return response[0];
  }

  async findMany(condition: RecipesCommonCondition): Promise<RecipesResponseDto[]> {
    return await this.findByCondition(condition);
  }

  async getItemCount(condition: CommonRecipeCondition): Promise<number> {
    const where: string[] = this.getWhere({
      authorUuid: condition.authorUuid,
      kitchenUuid: condition.kitchenUuid,
      dateInterval: condition.dateInterval
    });

    return await this.createQueryBuilder("r").where(where.join(" AND ")).getCount();
  }

  async getUuidByAuthor(uuid: string): Promise<string[]> {
    const entities: UuidListInterface[] = await this.manager.query<UuidListInterface[]>(`
      SELECT uuid
      FROM ${this.metadata.tableName}
      WHERE user_uuid = '${uuid}'
    `);

    return entities.map((entity) => entity.uuid);
  }

  async updateByEntity(condition: UpdateRecipeInterface): Promise<void> {
    await this.update({ uuid: condition.uuid, userUuid: condition.userUuid } as FindOptionsWhere<RecipesEntity>, {
      title: condition.title ?? undefined,
      description: condition.description ?? undefined,
      kitchenUuid: condition.kitchenUuid ?? undefined,
      manual: condition.manual ?? undefined
    });
  }

  private async findByCondition(condition: RecipesCommonCondition): Promise<RecipesResponseDto[]> {
    const where: string[] = this.getWhere({
      recipeUuid: condition.recipeUuid,
      authorUuid: condition.authorUuid,
      kitchenUuid: condition.kitchenUuid,
      dateInterval: condition.dateInterval
    });

    const selectQueryBuilder: SelectQueryBuilder<RecipesResponseDto[]> = this.createQueryBuilder("r")
      .select([
        "title",
        "description",
        "manual",
        "array_agg(json_build_object('productUuid', i.product_uuid, 'count', i.count)) as products"
      ])
      .addSelect("r.uuid", "uuid")
      .addSelect("kitchen_uuid", "kitchenUuid")
      .addSelect("date_create", "dateCreate")
      .addSelect("user_uuid", "authorUuid")
      .addSelect("u.nickname", "authorNickname")

      .leftJoin("ingredients", "i", "i.recipe_uuid = r.uuid")
      .leftJoin("users", "u", "r.user_uuid = u.uuid")

      .where(where.join(" AND "))

      .groupBy("title")

      .addGroupBy("description")
      .addGroupBy("r.uuid")
      .addGroupBy("kitchen_uuid")
      .addGroupBy("date_create")
      .addGroupBy("manual")
      .addGroupBy("user_uuid")
      .addGroupBy("u.nickname")
      .addGroupBy("nickname") as unknown as SelectQueryBuilder<RecipesResponseDto[]>;
    // по-умолчанию createQueryBuilder дженерик с интерфейсом RecipesEntity, поэтому использую такую конструкцию для корректной типизации

    if (condition.pageSize) {
      selectQueryBuilder.take(condition.pageSize);
    }

    if (condition.offset) {
      selectQueryBuilder.offset(condition.offset);
    }
    return (await selectQueryBuilder.execute()) as RecipesResponseDto[];
  }

  private getWhere(condition: CommonRecipeCondition): string[] {
    const where: string[] = [];

    if (condition.recipeUuid) {
      where.push(`r.uuid = '${condition.recipeUuid}'`);
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
