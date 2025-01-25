import { IsDefined, IsString } from "class-validator";

export interface PublicUserInterface {
  uuid: "string";
  dateRegistrations: "string";
  nickname: "string";
}

export class UserRegistration {
  @IsDefined()
  @IsString()
  email: string;

  @IsDefined()
  @IsString()
  nickname: string;

  @IsDefined()
  @IsString()
  userName: string;
}
