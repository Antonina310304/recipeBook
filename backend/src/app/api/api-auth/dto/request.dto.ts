import { IsDefined, IsString } from "class-validator";

export class AuthRequestDto {
  @IsDefined()
  @IsString()
  email: "string";
}
export class ConfirmCodeRequestDto extends AuthRequestDto {
  @IsDefined()
  @IsString()
  code: "string";
}
