import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { RefreshTokensEntity } from "../../entities/refresh-tokens.entity";

@Injectable()
export class RefreshTokensRepository extends Repository<RefreshTokensEntity> {
  @InjectRepository(RefreshTokensEntity)
  protected readonly refreshTokensRepository: Repository<RefreshTokensEntity>;

  private tableName: string = "refresh_tokens";

  constructor(manager: EntityManager) {
    super(RefreshTokensEntity, manager);
  }

  async findByToken(token: string): Promise<RefreshTokensEntity | undefined> {
    return this.findOne({ where: { token } });
  }

  async removeByToken(userUuid: string): Promise<void> {
    await this.manager.query(`DELETE FROM ${this.tableName} WHERE user_uuid = '${userUuid}'`);
  }
}
