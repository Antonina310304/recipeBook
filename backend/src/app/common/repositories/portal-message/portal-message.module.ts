import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PortalMessageEntity } from "../../entities/portal-message.entity";

import { PortalMessageRepository } from "./portal-message.repository";

@Module({
  imports: [TypeOrmModule.forFeature([PortalMessageEntity])],
  providers: [PortalMessageRepository],
  controllers: [],
  exports: [PortalMessageRepository]
})
export class PortalMessageModule {}
