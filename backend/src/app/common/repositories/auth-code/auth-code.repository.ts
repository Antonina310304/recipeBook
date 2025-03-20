import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { AuthCodeEntity } from "../../entities/auth-code.entity";

import { ConditionRemoveInterface } from "./types";

@Injectable()
export class AuthCodeRepository extends Repository<AuthCodeEntity> {
  @InjectRepository(AuthCodeEntity)
  protected readonly authCodeRepository: Repository<AuthCodeEntity>;

  private tableName: string = "auth_code";

  constructor(manager: EntityManager) {
    super(AuthCodeEntity, manager);
  }

  async findByCode(code: string): Promise<AuthCodeEntity | undefined> {
    return await this.findOne({
      where: {
        code
      }
    });
  }

  async removeByCondition(condition: ConditionRemoveInterface): Promise<AuthCodeEntity> {
    const where: string[] = [];

    if (condition.code) {
      where.push(`code = '${condition.code}'`);
    }

    if (condition.userEmail) {
      where.push(`user_email = '${condition.userEmail}'`);
    }

    return await this.manager.query<AuthCodeEntity>(`
      DELETE FROM ${this.tableName}
      WHERE ${where.join(" AND ")}
    `);
  }
}
