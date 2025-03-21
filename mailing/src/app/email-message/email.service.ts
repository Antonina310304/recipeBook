import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

import { ConfigService } from "../../common/config/config.service";

import { EmailSendInterface } from "./types";

@Injectable()
export class EmailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailService: MailerService
  ) {}

  async send({ email, template, subject, context }: EmailSendInterface): Promise<void> {
    await this.mailService.sendMail({
      from: this.configService.getEmail,
      to: email,
      subject: subject,
      template,
      context
    });
  }
}
