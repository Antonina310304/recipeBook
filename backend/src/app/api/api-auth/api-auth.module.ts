import { Module } from "@nestjs/common";

import { UsersModule } from "../../common/repositories/users/users.module";
import { AuthCodeModule } from "../../common/repositories/auth-code/auth-code.module";
import { AuthModule } from "../../auth/auth.module";
import { ConfigModule } from "../../common/config/config.module";
import { MailingModule } from "../../mailing/mailing.module";

import { ApiAuthService } from "./api-auth.service";
import { ApiAuthController } from "./api-auth.controller";

@Module({
  imports: [UsersModule, AuthCodeModule, AuthModule, ConfigModule, MailingModule],
  providers: [ApiAuthService],
  controllers: [ApiAuthController],
  exports: []
})
export class ApiAuthModule {}
