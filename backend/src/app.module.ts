import { resolve } from "path";

import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { MailerModule } from "@nestjs-modules/mailer";
import { MailerOptions } from "@nestjs-modules/mailer/dist/interfaces/mailer-options.interface";

import { ApiRecipesModule } from "./app/api/api-recipes/api-recipes.module";
import { ApiUsersModule } from "./app/api/api-users/api-users.module";
import { ConfigModule } from "./app/common/config/config.module";
import { ConfigService } from "./app/common/config/config.service";
import { ApiAuthModule } from "./app/api/api-auth/api-auth.module";

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
          entities: [resolve(__dirname, "app", "common", "entities", "*.entity.[t|j]s")],
          migrations: [resolve(__dirname, "database", "migrations", "**", "*")],
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
          }
        };
      }
    }),
    ApiRecipesModule,
    ApiUsersModule,
    ApiAuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
