import { MessageMaker, MessageType } from "./types";
import { MessageCreatorKitchenNotification } from "./message-creator-kitchen-notification";
import { MessageCreatorAuthorNotification } from "./message-creator-author-notification";
import { MessageCreatorAuthCode } from "./message-creator-auth-code";

export class MessageFactory {
  getMessageMaker(messageType: MessageType): MessageMaker {
    const handlers: Record<MessageType, MessageMaker> = {
      [MessageType.AUTHOR]: new MessageCreatorAuthorNotification(),
      [MessageType.KITCHEN]: new MessageCreatorKitchenNotification(),
      [MessageType.AUTH_CODE]: new MessageCreatorAuthCode()
    };

    return handlers[messageType];
  }
}
