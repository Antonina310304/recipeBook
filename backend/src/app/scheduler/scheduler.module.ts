import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { HttpModuleOptions } from "@nestjs/axios/dist/interfaces/http-module.interface";

import { ConfigModule } from "../common/config/config.module";
import { ConfigService } from "../common/config/config.service";

import { SchedulerService } from "./scheduler.service";

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): HttpModuleOptions => {
        return {
          baseURL: configService.keysForOutcomingRequests.url
        };
      },
      inject: [ConfigService]
    })
  ],
  providers: [SchedulerService],
  controllers: [],
  exports: [SchedulerService]
})
export class SchedulerModule {}
