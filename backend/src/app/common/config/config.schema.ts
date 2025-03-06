import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested
} from "class-validator";
import { Algorithm } from "jsonwebtoken";
export enum DatabaseType {
  postgres = "postgres",
  mysql = "mysql"
}

export class DatabaseConfig {
  @IsDefined()
  @IsEnum(DatabaseType)
  readonly type: DatabaseType;

  @IsString()
  @IsNotEmpty()
  readonly host: string;

  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  readonly port: number = 5432;

  @IsString()
  @IsNotEmpty()
  readonly database: string = "postgres";

  @IsString()
  @IsNotEmpty()
  readonly username: string = "postgres";

  @IsString()
  @IsDefined()
  readonly password: string = "";
}

export class AuthElasticSearch {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class IndexElasticSearch {
  @IsString()
  @IsDefined()
  key: string;

  @IsString()
  @IsDefined()
  name: string;
}

export class ElasticSearchConfig {
  @IsDefined()
  @IsString()
  readonly url: string;

  @IsDefined()
  @IsNumber()
  readonly maxRetries: number;

  @IsDefined()
  @IsNumber()
  readonly requestTimeout: number;

  @IsDefined()
  @IsNumber()
  readonly pingTimeout: number;

  @IsDefined()
  @IsBoolean()
  readonly sniffOnStart: boolean;

  @IsDefined()
  @Type(() => AuthElasticSearch)
  readonly auth: AuthElasticSearch;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IndexElasticSearch)
  readonly indexes: IndexElasticSearch[];
}

export class OutcomeKeyConfig {
  @IsDefined()
  @IsString()
  readonly url: string;

  @IsDefined()
  @IsString()
  readonly issuer: string;

  @IsDefined()
  @IsString()
  readonly secret: string;

  @IsDefined()
  @IsString()
  readonly audience: string;

  @IsString()
  readonly algorithm?: Algorithm;
}

export class ApplicationConfig {
  @IsDefined()
  @ValidateNested()
  @Type(() => DatabaseConfig)
  readonly database: DatabaseConfig;

  @IsDefined()
  @ValidateNested()
  @Type(() => OutcomeKeyConfig)
  readonly keysForOutcomingRequests: OutcomeKeyConfig;

  @IsDefined()
  @ValidateNested()
  @Type(() => ElasticSearchConfig)
  readonly elasticSearch: ElasticSearchConfig;

  @IsDefined()
  @IsNumber()
  timeLifeAuthCode: number;

  @IsDefined()
  @IsString()
  accessSecret: string;

  @IsDefined()
  @IsNumber()
  timeLifeAccessToken: number;

  @IsDefined()
  @IsNumber()
  timeLifeRefreshToken: number;
}
