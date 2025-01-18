import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {RefreshTokensEntity} from "../../common/entities/refresh-tokens.entity";

@Injectable()
export class RefreshTokensService {
    constructor(
        @InjectRepository(RefreshTokensEntity)
        private recipeEventsEntityRepository: Repository<RefreshTokensEntity>,
    ) {}
}