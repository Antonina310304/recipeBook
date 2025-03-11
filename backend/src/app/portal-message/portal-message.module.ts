import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PortalMessageEntity } from "../../common/entities/portal-message.entity";

import { PortalMessageService } from "./portal-message.service";

@Module({
  imports: [TypeOrmModule.forFeature([PortalMessageEntity])],
  providers: [PortalMessageService],
  controllers: [],
  exports: [PortalMessageService]
})
export class PortalMessageModule {}
