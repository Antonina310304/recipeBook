import { Module } from "@nestjs/common";

import { UsersModule } from "../../../common/repositories/users/users.module";
import { AuthModule } from "../../auth/auth.module";

import { ApiUsersController } from "./api-users.controller";

@Module({
  imports: [UsersModule, AuthModule],
  providers: [],
  controllers: [ApiUsersController],
  exports: []
})
export class ApiUsersModule {}
