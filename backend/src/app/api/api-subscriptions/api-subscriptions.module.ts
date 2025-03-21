import { Module } from "@nestjs/common";

import { AuthModule } from "../../auth/auth.module";
import { UsersModule } from "../../common/repositories/users/users.module";
import { SubscriptionsUsersModule } from "../../common/repositories/subscriptions-users/subscriptions-users.module";

import { ApiSubscriptionsController } from "./api-subscriptions.controller";
import { ApiSubscriptionsService } from "./api-subscriptions.service";

@Module({
  imports: [AuthModule, UsersModule, SubscriptionsUsersModule],
  providers: [ApiSubscriptionsService],
  controllers: [ApiSubscriptionsController],
  exports: []
})
export class ApiSubscriptionsModule {}
