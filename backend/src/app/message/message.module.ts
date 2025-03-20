import { Module } from "@nestjs/common";

import { ConfigModule } from "../../common/config/config.module";

import { EmailService } from "./email.service";

// подумать над тем, чтобы
// на 3 релизе вынести этот сервис в микросервис уведомлений
@Module({
  imports: [ConfigModule],
  providers: [EmailService],
  controllers: [],
  exports: [EmailService]
})
export class MessageModule {}
