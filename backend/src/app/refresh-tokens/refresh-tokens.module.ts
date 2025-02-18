import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { RefreshTokensEntity } from "../../common/entities/refresh-tokens.entity";

import { RefreshTokensService } from "./refresh-tokens.service";

@Module({
  imports: [TypeOrmModule.forFeature([RefreshTokensEntity])],
  providers: [RefreshTokensService],
  controllers: [],
  exports: [RefreshTokensService]
})
export class RefreshTokensModule {}
