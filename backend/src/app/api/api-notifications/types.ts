import { IsBoolean, IsDefined } from "class-validator";

export class NotificationsInterface {
  @IsDefined()
  @IsBoolean()
  emailNotification: boolean;

  @IsDefined()
  @IsBoolean()
  portalNotification: boolean;
}
