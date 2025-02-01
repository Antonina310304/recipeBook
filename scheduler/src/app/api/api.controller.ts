import {
  BadRequestException,
  Body,
  Controller,
  Injectable,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { Response } from "express";
import { ValidationError } from "class-validator";

import { CommonErrorBuilder } from "../../common/common-error-builder/common-error-builder";
import { ErrorDescription } from "../../common/common-error-builder/types";
import { MessageFactory } from "../email-message/message-factory/message.factory";
import { MessageMaker, MessageType } from "../email-message/message-factory/types";
import { EmailService } from "../email-message/email.service";
import { EmailSendInterface } from "../email-message/types";
import { JwtAuthGuard } from "../../common/decorators/jwt.strategy";
import { CurrentUser, UserInterface } from "../../common/decorators/current-user.decorator";

import { CodeRequest } from "./type";

@Injectable()
@Controller("/api")
@UsePipes(
  new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]): Error => {
      throw new BadRequestException(
        errors.map(({ constraints }: ValidationError) => Object.values(constraints).join(", ")).join(", ")
      );
    }
  })
)
@UseGuards(JwtAuthGuard)
export class ApiController {
  constructor(private readonly emailService: EmailService) {}

  @Post("code")
  async sendCode(
    @CurrentUser() { userEmail, userName }: UserInterface,
    @Body() body: CodeRequest,
    @Res() response: Response<void | ErrorDescription>
  ): Promise<void> {
    try {
      const messageFactory: MessageFactory = new MessageFactory();
      const messageMaker: MessageMaker = messageFactory.getMessageMaker(MessageType.AUTH_CODE);
      const data: EmailSendInterface = messageMaker.makeMessage({
        [MessageType.AUTH_CODE]: { code: body.code, userName, userEmail }
      });
      await this.emailService.send(data);
      response.status(204).send();
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }
}
