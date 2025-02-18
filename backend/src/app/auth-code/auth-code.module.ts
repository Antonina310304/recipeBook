import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthCodeEntity } from "../../common/entities/auth-code.entity";

import { AuthCodeService } from "./auth-code.service";

@Module({
  imports: [TypeOrmModule.forFeature([AuthCodeEntity])],
  providers: [AuthCodeService],
  controllers: [],
  exports: [AuthCodeService]
})
export class AuthCodeModule {}
