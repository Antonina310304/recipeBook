import { CommonRecipeListForMailing, DataForMailingFoKitchens } from "../../../common/repositories/recipe-events/types";
import { EmailSendInterface } from "../types";

export type MessageTypes = {
  [MessageType.AUTHOR]?: CommonRecipeListForMailing & { site: string };
  [MessageType.KITCHEN]?: DataForMailingFoKitchens & { site: string };
};
export enum MessageType {
  AUTHOR = "AUTHOR",
  KITCHEN = "KITCHEN"
}

export interface MessageMaker {
  makeMessage(event: MessageTypes): EmailSendInterface;
}
