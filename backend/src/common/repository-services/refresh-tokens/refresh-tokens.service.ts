import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {RefreshTokensEntity} from "../../entities/refresh-tokens.entity";

@Injectable()
export class RefreshTokensService {
    constructor(
        @InjectRepository(RefreshTokensEntity)
        private refreshTokensRepository: Repository<RefreshTokensEntity>,
    ) {}
}