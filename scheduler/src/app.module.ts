import { resolve } from "path";

import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { MailerModule } from "@nestjs-modules/mailer";
import { MailerOptions } from "@nestjs-modules/mailer/dist/interfaces/mailer-options.interface";
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter";

import { ConfigModule } from "./common/config/config.module";
import { ConfigService } from "./common/config/config.service";
import { SchedulerModule } from "./app/scheduler/scheduler.module";
import { ApiModule } from "./app/api/api.module";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService): TypeOrmModuleOptions {
        return {
          type: "postgres",
          host: config.database.host,
          port: config.database.port,
          username: config.database.username,
          password: config.database.password,
          database: config.database.database,
          entities: [resolve(__dirname, "common", "entities", "*.entity.[t|j]s")],
          migrations: [],
          synchronize: false,
          migrationsRun: true,
          logging: true
        };
      }
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService): MailerOptions {
        return {
          transport: {
            host: config.mailerConfig.host,
            auth: {
              user: config.mailerConfig.user,
              pass: config.mailerConfig.password
            }
          },
          template: {
            adapter: new PugAdapter(),
            dir: resolve(__dirname + "/templates"),
            options: {
              strict: true
            }
          }
        };
      }
    }),
    SchedulerModule,
    ApiModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
