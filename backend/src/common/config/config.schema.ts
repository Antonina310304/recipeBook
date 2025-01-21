import { Type } from "class-transformer";
import { IsDefined, IsEnum, IsInt, IsNotEmpty, IsPositive, IsString, ValidateNested } from "class-validator";

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

export class MailConfig {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly host: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly user: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class ApplicationConfig {
  @IsDefined()
  @ValidateNested()
  @Type(() => DatabaseConfig)
  readonly database: DatabaseConfig;

  @IsDefined()
  @ValidateNested()
  @Type(() => MailConfig)
  readonly mailerConfig: MailConfig;
}
