import { CommonRecipeListForMailing, DataForMailingFoKitchens } from "../../../common/repositories/recipe-events/types";
import { EmailSendInterface } from "../types";

export type SiteInterface = {
  site: string;
};

export type MessageTypes = {
  [MessageType.AUTHOR]?: CommonRecipeListForMailing & SiteInterface;
  [MessageType.KITCHEN]?: DataForMailingFoKitchens & SiteInterface;
  [MessageType.AUTH_CODE]?: AuthCodeInterface;
};

export enum MessageType {
  AUTHOR = "AUTHOR",
  KITCHEN = "KITCHEN",
  AUTH_CODE = "AUTH_CODE"
}

export interface MessageMaker {
  makeMessage(event: MessageTypes): EmailSendInterface;
}

export type AuthCodeInterface = {
  userEmail: string;
  code: string;
  userName: string;
};
