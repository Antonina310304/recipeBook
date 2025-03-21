import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { ConfigModule } from "../common/config/config.module";
import { SearchModule } from "../search/search.module";

import { SchedulerService } from "./scheduler.service";

@Module({
  imports: [ConfigModule, ScheduleModule.forRoot(), SearchModule],
  providers: [SchedulerService],
  controllers: [],
  exports: []
})
export class SchedulerModule {}
