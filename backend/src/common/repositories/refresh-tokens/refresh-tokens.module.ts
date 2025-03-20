import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { RefreshTokensEntity } from "../../entities/refresh-tokens.entity";

import { RefreshTokensRepository } from "./refresh-tokens.repository";

@Module({
  imports: [TypeOrmModule.forFeature([RefreshTokensEntity])],
  providers: [RefreshTokensRepository],
  controllers: [],
  exports: [RefreshTokensRepository]
})
export class RefreshTokensModule {}
