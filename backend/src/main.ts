import { NestFactory } from "@nestjs/core";
import { INestApplication } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
// somewhere in your initialization file

import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch(console.error);
