import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { UsersEntity } from "../../entities/users.entity";
import { PublicUserInterface } from "../../../app/api/api-users/types";

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

  async findByEmail(userEmail: string): Promise<UsersEntity | null> {
    return await this.findOne({ where: { userEmail } });
  }
}
