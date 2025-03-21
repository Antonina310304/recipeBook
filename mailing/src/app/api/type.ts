import { IsDefined, IsString } from "class-validator";

export class CodeRequest {
  @IsDefined()
  @IsString()
  code: string;
}
