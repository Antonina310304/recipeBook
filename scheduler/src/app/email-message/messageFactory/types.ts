import { CommonRecipeListForMailing, DataForMailingFoKitchens } from "../../../common/repositories/recipe-events/types";
import { EmailSendInterface } from "../types";

export type SiteInterface = {
  site: string;
}

export type MessageTypes = {
  [MessageType.AUTHOR]?: CommonRecipeListForMailing & SiteInterface;
  [MessageType.KITCHEN]?: DataForMailingFoKitchens & SiteInterface;
};
export enum MessageType {
  AUTHOR = "AUTHOR",
  KITCHEN = "KITCHEN"
}

export interface MessageMaker {
  makeMessage(event: MessageTypes): EmailSendInterface;
}
