import { AuthCodeInterface, MessageCreator, MessageType, MessageTypes } from "./types";

export class MessageCreatorCodeAuth implements MessageCreator {
  makeMessage(event: MessageTypes): string {
    const data: AuthCodeInterface = event[MessageType.AUTH_CODE];
    return `Ваш код авторизации ${data.code}`;
  }
}
