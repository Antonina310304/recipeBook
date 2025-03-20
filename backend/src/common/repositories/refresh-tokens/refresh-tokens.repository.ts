import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { RefreshTokensEntity } from "../../entities/refresh-tokens.entity";

@Injectable()
export class RefreshTokensRepository extends Repository<RefreshTokensEntity> {
  @InjectRepository(RefreshTokensEntity)
  protected readonly refreshTokensRepository: Repository<RefreshTokensEntity>;

  constructor(manager: EntityManager) {
    super(RefreshTokensEntity, manager);
  }
}
