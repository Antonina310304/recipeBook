import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AuthCodeEntity } from "../../common/entities/auth-code.entity";

@Injectable()
export class AuthCodeService {
  constructor(
    @InjectRepository(AuthCodeEntity)
    private authCodeRepository: Repository<AuthCodeEntity>
  ) {}
}
