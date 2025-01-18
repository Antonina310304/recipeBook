import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {PortalMessageEntity} from "../../common/entities/portal-message.entity";

@Injectable()
export class PortalMessageService {
    constructor(
        @InjectRepository(PortalMessageEntity)
        private portalMessageRepository: Repository<PortalMessageEntity>,
    ) {}
}