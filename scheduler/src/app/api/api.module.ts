import { Module } from "@nestjs/common";

import { MessageModule } from "../email-message/message.module";
import { JwtStrategy } from "../../common/decorators/jwt.strategy";
import { ConfigModule } from "../../common/config/config.module";

import { ApiController } from "./api.controller";

@Module({
  imports: [MessageModule, ConfigModule],
  providers: [JwtStrategy],
  controllers: [ApiController]
})
export class ApiModule {}
