import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersEntity } from "../../entities/users.entity";

import { UsersRepository } from "./users-repository.service";

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [UsersRepository],
  controllers: [],
  exports: [UsersRepository]
})
export class UsersModule {}
