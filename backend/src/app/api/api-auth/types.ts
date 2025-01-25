import { IsString, IsDefined } from "class-validator";

export class CommonAuthRequest {
  @IsDefined()
  @IsString()
  email: "string";
}
export class ConfirmCodeRequest extends CommonAuthRequest {
  @IsDefined()
  @IsString()
  code: "string";
}

export interface TokensInterface {
  accessToken: string;
  refreshToken: string;
}

export interface MaxAgeTokensInterface {
  accessToken: number;
  refreshToken: number;
}
