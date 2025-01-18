import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {UserNotificationSettingEntity} from "../../common/entities/user-notification-setting.entity";

@Injectable()
export class SubscriptionsUsersService {
    constructor(
        @InjectRepository(UserNotificationSettingEntity)
        private userNotificationRepository: Repository<UserNotificationSettingEntity>,
    ) {}
}