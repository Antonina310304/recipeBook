import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersService} from "./users.service";
import {UsersEntity} from "../../common/entities/users.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity])],
    providers: [UsersService],
    controllers: [],
    exports: [UsersService]
})
export class UsersModule {}
