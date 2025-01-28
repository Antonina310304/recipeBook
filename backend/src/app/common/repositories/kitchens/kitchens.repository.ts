import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { KitchensEntity } from "../../entities/kitchen.entity";

@Injectable()
export class KitchensRepository extends Repository<KitchensEntity> {
  @InjectRepository(KitchensEntity)
  protected readonly kitchensRepository: Repository<KitchensEntity>;

  constructor(manager: EntityManager) {
    super(KitchensEntity, manager);
  }
}
