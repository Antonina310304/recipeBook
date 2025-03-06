import { existsSync, readFileSync } from "fs";
import { dirname, join, resolve } from "path";

import { Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validateSync, ValidationError } from "class-validator";
import { EventEmitter2 } from "eventemitter2";
import { load } from "js-yaml";

import {
  ApplicationConfig,
  CronConfig,
  DatabaseConfig,
  KeysForIncomingRequestsConfig,
  MailConfig
} from "./config.schema";

@Injectable()
export class ConfigService implements ApplicationConfig {
  private config: ApplicationConfig;

  private readonly configEvents: EventEmitter2 = new EventEmitter2();

  constructor() {
    this.loadConfig();
    process.on("SIGHUP", () => this.loadConfig());
  }

  get database(): DatabaseConfig {
    return this.config.database;
  }

  get getEmail(): string {
    return this.config.mailerConfig.user;
  }

  get mailerConfig(): MailConfig {
    return this.config.mailerConfig;
  }

  get cron(): CronConfig {
    return this.config.cron;
  }

  get site(): string {
    return this.config.site;
  }

  get keysForIncomingRequests(): KeysForIncomingRequestsConfig {
    return this.config.keysForIncomingRequests;
  }

  private loadConfig(): void {
    let filename: string;
    const root: string = resolve(dirname(require.main?.filename ?? ""), "../");

    if (existsSync(join(root, "config.yaml"))) {
      filename = resolve(join(root, "config.yaml"));
    } else if (existsSync(join(root, "config.yml"))) {
      filename = join(root, "config.yml");
    } else {
      throw new Error(`Добавьте конфиг в  ${root} директорию`);
    }
    this.config = plainToClass(ApplicationConfig, load(readFileSync(filename, "utf-8")), {
      exposeDefaultValues: true,
      enableImplicitConversion: false
    });
    const cfgErrors: ValidationError[] = validateSync(this.config, { whitelist: true, forbidNonWhitelisted: true });
    if (cfgErrors.length > 0) {
      throw new Error(`Ошибка валидации конфига: ${JSON.stringify(cfgErrors, null, 2)}`);
    }
    this.configEvents.emit("config", this.config);
  }
}
