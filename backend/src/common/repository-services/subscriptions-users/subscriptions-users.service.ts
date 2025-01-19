import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {SubscriptionsUsersEntity} from "../../entities/subscriptions-users.entity";

@Injectable()
export class SubscriptionsUsersService {
    constructor(
        @InjectRepository(SubscriptionsUsersEntity)
        private subscriptionsUserRepository: Repository<SubscriptionsUsersEntity>,
    ) {}
}