import { resolve } from "path";

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ApiRecipesModule } from "./app/api-recipes/api-recipes.module";
import { ApiUsersModule } from "./app/api-users/api-users.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "db",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "postgres",
      entities: [],
      migrations: [resolve(__dirname, "database", "migrations", "**", "*")],
      synchronize: false,
      migrationsRun: true,
      logging: true
    }),
    ApiRecipesModule,
    ApiUsersModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
