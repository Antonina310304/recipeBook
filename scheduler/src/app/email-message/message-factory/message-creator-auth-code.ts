import { EmailSendInterface } from "../types";

import { MessageMaker, MessageType, MessageTypes } from "./types";

export class MessageCreatorAuthCode implements MessageMaker {
  makeMessage(event: MessageTypes): EmailSendInterface {
    const data: Record<string, string> = event[MessageType.AUTH_CODE] as unknown as Record<string, string>;
    return {
      email: data.userEmail,
      template: "auth-code",
      context: data,
      subject: `Код подтверждения`
    };
  }
}
