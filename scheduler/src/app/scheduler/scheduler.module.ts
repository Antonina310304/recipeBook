import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { MessageModule } from "../email-message/message.module";
import { ConfigModule } from "../../common/config/config.module";
import { NotificationMessageModule } from "../notification-message/notification-message.module";

import { SchedulerService } from "./scheduler.service";

@Module({
  imports: [NotificationMessageModule, MessageModule, ConfigModule, ScheduleModule.forRoot()],
  providers: [SchedulerService],
  controllers: []
})
export class SchedulerModule {}
