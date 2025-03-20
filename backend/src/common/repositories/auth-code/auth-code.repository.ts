import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { AuthCodeEntity } from "../../entities/auth-code.entity";

@Injectable()
export class AuthCodeRepository extends Repository<AuthCodeEntity> {
  @InjectRepository(AuthCodeEntity)
  protected readonly authCodeRepository: Repository<AuthCodeEntity>;

  constructor(manager: EntityManager) {
    super(AuthCodeEntity, manager);
  }
}
