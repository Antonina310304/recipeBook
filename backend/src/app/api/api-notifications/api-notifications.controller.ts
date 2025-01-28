import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Put,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { ValidationError } from "class-validator";
import { Response } from "express";

import { AuthGuard } from "../../auth/auth.guard";
import { ErrorDescription } from "../../common/common-error-builder/types";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { UserInterface } from "../../common/types";
import { CommonErrorBuilder } from "../../common/common-error-builder/common-error-builder";

import { NotificationsInterface } from "./types";
import { ApiNotificationsService } from "./api-notifications.service";

@Controller("/notifications")
@UsePipes(
  new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]): Error => {
      throw new BadRequestException(
        errors.map(({ constraints }: ValidationError) => Object.values(constraints).join(", ")).join(", ")
      );
    }
  })
)
export class ApiNotificationsController {
  constructor(private readonly apiNotificationsService: ApiNotificationsService) {}

  @Put()
  @UseGuards(AuthGuard)
  async updateNotifications(
    @Body() body: NotificationsInterface,
    @Res() response: Response<NotificationsInterface | ErrorDescription>,
    @CurrentUser() { email }: UserInterface
  ): Promise<void> {
    try {
      await this.apiNotificationsService.updateNotification(email, body);
      const notifications: NotificationsInterface = await this.apiNotificationsService.getNotifications(email);
      response.status(200).send(notifications);
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async getNotifications(
    @Res() response: Response<NotificationsInterface | ErrorDescription>,
    @CurrentUser() { email }: UserInterface
  ): Promise<void> {
    try {
      const notifications: NotificationsInterface = await this.apiNotificationsService.getNotifications(email);
      response.status(200).send(notifications);
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }
}
