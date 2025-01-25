import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { UsersEntity } from "../../entities/users.entity";
import { PublicUserInterface } from "../../../app/api/api-users/types";

import { UserCondition } from "./types";

@Injectable()
export class UsersRepository extends Repository<UsersEntity> {
  @InjectRepository(UsersEntity)
  protected readonly portalMessageRepository: Repository<UsersEntity>;

  private tableName: string = "users";

  constructor(manager: EntityManager) {
    super(UsersEntity, manager);
  }

  async getPublicUsersInfo(): Promise<PublicUserInterface[]> {
    return await this.manager.query<PublicUserInterface[]>(`
      SELECT
        uuid,
        nickname,
        date_registration as "dateRegistration"
      FROM ${this.tableName}
    `);
  }

  async findByCondition(condition: UserCondition): Promise<UsersEntity | null> {
    const where: string[] = [];

    if (condition.uuid) {
      where.push(`uuid = '${condition.uuid}'`);
    }

    if (condition.userEmail) {
      where.push(`user_email = '${condition.userEmail}'`);
    }

    const response: UsersEntity[] = await this.manager.query<UsersEntity[]>(`
      SELECT
        uuid,
        nickname,
        user_email as "userEmail",
        user_name as "userName",
        date_registration as "dateRegistration"
      FROM ${this.tableName}
      ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
    `);

    if (!response.length) {
      return null;
    }
    return response[0];
  }
}
