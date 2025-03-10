import { resolve } from "path";

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ApiRecipesModule } from "./app/recipes/recipes.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "db",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "postgres",
      entities: [resolve(__dirname, "common", "entities", "*.entity.[t|j]s")],
      migrations: [resolve(__dirname, "database", "migrations", "**", "*")],
      synchronize: false,
      migrationsRun: true,
      logging: true
    }),
    ApiRecipesModule
  ],
  controllers: [],
  providers: [ApiRecipesModule]
})
export class AppModule {}
