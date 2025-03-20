export type MessageTypes = {
  [MessageType.AUTH_CODE]: AuthCodeInterface;
};
export enum MessageType {
  AUTH_CODE = "AUTH_CODE"
}

export interface AuthCodeInterface {
  code: string;
}

export interface MessageCreator {
  makeMessage(event: MessageTypes): string;
}
