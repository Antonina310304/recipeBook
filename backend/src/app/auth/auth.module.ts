import { Module } from "@nestjs/common";

import { UsersModule } from "../common/repositories/users/users.module";
import { ConfigModule } from "../common/config/config.module";
import { RefreshTokensModule } from "../common/repositories/refresh-tokens/refresh-tokens.module";
import { AuthCodeModule } from "../common/repositories/auth-code/auth-code.module";

import { UserGuard } from "./user.guard";
import { AuthGuard } from "./auth.guard";
import { TokenService } from "./token.service";
import { AuthCodeService } from "./auth-code.service";
import { AuthService } from "./auth.service";

@Module({
  imports: [UsersModule, ConfigModule, RefreshTokensModule, AuthCodeModule],
  providers: [UserGuard, AuthGuard, TokenService, AuthCodeService, AuthService],
  controllers: [],
  exports: [UserGuard, AuthGuard, AuthCodeService, TokenService, AuthService]
})
export class AuthModule {}
