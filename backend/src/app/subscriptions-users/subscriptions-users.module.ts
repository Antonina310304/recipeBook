import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SubscriptionsUsersService} from "./subscriptions-users.service";
import {SubscriptionsUsersEntity} from "../../common/entities/subscriptions-users.entity";

@Module({
    imports: [TypeOrmModule.forFeature([SubscriptionsUsersEntity])],
    providers: [SubscriptionsUsersService],
    controllers: [],
    exports: [SubscriptionsUsersService]
})
export class SubscriptionsUsersModule {}
