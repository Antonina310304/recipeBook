import { Module } from "@nestjs/common";

import { NotificationMessageService } from "./notification-message.service";

@Module({
  exports: [NotificationMessageService],
  providers: [NotificationMessageService],
  controllers: []
})
export class NotificationMessageModule {}
