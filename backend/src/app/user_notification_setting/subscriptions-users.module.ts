import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SubscriptionsUsersService} from "./subscriptions-users.service";
import {UserNotificationSettingEntity} from "../../common/entities/user-notification-setting.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserNotificationSettingEntity])],
    providers: [SubscriptionsUsersService],
    controllers: [],
    exports: [SubscriptionsUsersService]
})
export class SubscriptionsUsersModule {}
