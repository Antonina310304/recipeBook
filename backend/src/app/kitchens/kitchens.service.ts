import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { KitchensEntity } from "../../common/entities/kitchen.entity";

@Injectable()
export class KitchensService {
  constructor(
    @InjectRepository(KitchensEntity)
    private kitchensRepository: Repository<KitchensEntity>
  ) {}
}
