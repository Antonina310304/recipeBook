import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RefreshTokensService} from "./refresh-tokens.service";
import {RefreshTokensEntity} from "../../entities/refresh-tokens.entity";

@Module({
    imports: [TypeOrmModule.forFeature([RefreshTokensEntity])],
    providers: [RefreshTokensService],
    controllers: [],
    exports: [RefreshTokensService]
})
export class RefreshTokensModule {}
