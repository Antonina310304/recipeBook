import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthCodeEntity } from "../../entities/auth-code.entity";

import { AuthCodeRepository } from "./auth-code.repository";

@Module({
  imports: [TypeOrmModule.forFeature([AuthCodeEntity])],
  providers: [AuthCodeRepository],
  controllers: [],
  exports: [AuthCodeRepository]
})
export class AuthCodeModule {}
