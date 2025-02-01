export interface EmailSendInterface {
  email: string;
  template: string;
  context: Record<string, string>;
  subject: string;
}
