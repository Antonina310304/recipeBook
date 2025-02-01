import { Module } from "@nestjs/common";

import { ConfigModule } from "../../common/config/config.module";

import { EmailService } from "./email.service";

@Module({
  imports: [ConfigModule, ConfigModule],
  providers: [EmailService],
  controllers: [],
  exports: [EmailService]
})
export class MessageModule {}
