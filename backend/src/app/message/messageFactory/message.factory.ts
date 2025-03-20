import { MessageCreator, MessageType } from "./types";
import { MessageCreatorCodeAuth } from "./message-creator-code-auth";

export class MessageFactory {
  makeMessageCreator(messageType: MessageType): MessageCreator {
    const handlers: Record<MessageType, MessageCreator> = {
      [MessageType.AUTH_CODE]: new MessageCreatorCodeAuth()
    };

    return handlers[messageType];
  }
}
