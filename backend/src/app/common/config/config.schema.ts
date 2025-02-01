import { Type } from "class-transformer";
import { IsDefined, IsEnum, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, ValidateNested } from "class-validator";
import { Algorithm } from "jsonwebtoken";
export enum DatabaseType {
  POSTGRES = "postgres"
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
