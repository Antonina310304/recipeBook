import { Module } from "@nestjs/common";

import { UsersModule } from "../../../common/repositories/users/users.module";
import { AuthModule } from "../../auth/auth.module";

import { ApiUsersController } from "./api-users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [UsersModule, AuthModule],
  providers: [UsersService],
  controllers: [ApiUsersController],
  exports: []
})
export class ApiUsersModule {}
