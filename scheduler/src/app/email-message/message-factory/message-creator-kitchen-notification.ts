import { EmailSendInterface } from "../types";

import { MessageMaker, MessageType, MessageTypes } from "./types";

export class MessageCreatorKitchenNotification implements MessageMaker {
  makeMessage(event: MessageTypes): EmailSendInterface {
    const data: Record<string, string> = event[MessageType.KITCHEN] as unknown as Record<string, string>;
    return {
      email: data.userEmail,
      template: "kitchen-notification",
      context: data,
      subject: `Регулярная рассылка по подписке на кухню ${data.kitchenTitle}`
    };
  }
}
