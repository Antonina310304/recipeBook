import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthCodeService} from "./auth-code.service";
import {AuthCodeEntity} from "../../common/entities/auth-code.entity";

@Module({
    imports: [TypeOrmModule.forFeature([AuthCodeEntity])],
    providers: [AuthCodeService],
    controllers: [],
    exports: [AuthCodeService]
})
export class AuthCodeModule {}
