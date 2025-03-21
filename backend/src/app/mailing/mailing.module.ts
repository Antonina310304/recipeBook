import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { HttpModuleOptions } from "@nestjs/axios/dist/interfaces/http-module.interface";

import { ConfigModule } from "../common/config/config.module";
import { ConfigService } from "../common/config/config.service";

import { MailingService } from "./mailing.service";

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): HttpModuleOptions => {
        return {
          baseURL: configService.keysForOutcomingRequests.url
        };
      }
    })
  ],
  providers: [MailingService],
  controllers: [],
  exports: [MailingService]
})
export class MailingModule {}
