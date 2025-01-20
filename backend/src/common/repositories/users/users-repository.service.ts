import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { UsersEntity } from "../../entities/users.entity";

@Injectable()
export class UsersRepository extends Repository<UsersEntity> {
  @InjectRepository(UsersEntity)
  protected readonly portalMessageRepository: Repository<UsersEntity>;

  constructor(manager: EntityManager) {
    super(UsersEntity, manager);
  }
}
