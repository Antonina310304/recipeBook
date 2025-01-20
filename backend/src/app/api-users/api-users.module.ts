import { Module } from "@nestjs/common";

import { UsersModule } from "../../common/repositories/users/users.module";

import { ApiUsersController } from "./api-users.controller";

@Module({
  imports: [UsersModule],
  providers: [],
  controllers: [ApiUsersController],
  exports: []
})
export class ApiUsersModule {}
