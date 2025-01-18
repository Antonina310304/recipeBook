import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PortalMessageService} from "./portal-message.service";
import {PortalMessageEntity} from "../../common/entities/portal-message.entity";

@Module({
    imports: [TypeOrmModule.forFeature([PortalMessageEntity])],
    providers: [PortalMessageService],
    controllers: [],
    exports: [PortalMessageService]
})
export class PortalMessageModule {}
