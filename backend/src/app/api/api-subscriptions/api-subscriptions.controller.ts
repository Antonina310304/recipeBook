import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { ValidationError } from "class-validator";
import { Response } from "express";

import { AuthGuard } from "../../auth/auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { UserInterface } from "../../common/types";
import { CommonErrorBuilder } from "../../common/common-error-builder/common-error-builder";

import { SubscriptionsKitchenInfo, SubscriptionsUserInfo } from "./types";
import { ApiSubscriptionsService } from "./api-subscriptions.service";

@Controller("/subscriptions")
@UsePipes(
  new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]): Error => {
      throw new BadRequestException(
        errors.map(({ constraints }: ValidationError) => Object.values(constraints).join(", ")).join(", ")
      );
    }
  })
)
export class ApiSubscriptionsController {
  constructor(private readonly apiSubscriptionsService: ApiSubscriptionsService) {}

  @Post("/authors/:uuid")
  @UseGuards(AuthGuard)
  async addAuthor(
    @Param("uuid") uuid: string,
    @Res() response: Response<SubscriptionsUserInfo[]>,
    @CurrentUser() { email }: UserInterface
  ): Promise<void> {
    try {
      await this.apiSubscriptionsService.addAuthor(email, uuid);
      const subscriptionList: SubscriptionsUserInfo[] =
        await this.apiSubscriptionsService.getAllUserSubscriptions(email);
      response.status(200).send(subscriptionList);
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }

  @Get("/authors")
  @UseGuards(AuthGuard)
  async getAuthors(
    @Res() response: Response<SubscriptionsUserInfo[]>,
    @CurrentUser() { email }: UserInterface
  ): Promise<void> {
    try {
      const subscriptionList: SubscriptionsUserInfo[] =
        await this.apiSubscriptionsService.getAllUserSubscriptions(email);
      response.status(200).send(subscriptionList);
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }

  @Delete("/authors/:uuid")
  @UseGuards(AuthGuard)
  async removeAuthor(
    @Param("uuid") uuid: string,
    @Res() response: Response<SubscriptionsUserInfo[]>,
    @CurrentUser() { email }: UserInterface
  ): Promise<void> {
    try {
      await this.apiSubscriptionsService.removeAuthor(email, uuid);
      const subscriptionList: SubscriptionsUserInfo[] =
        await this.apiSubscriptionsService.getAllUserSubscriptions(email);
      response.status(200).send(subscriptionList);
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }

  @Post("/kitchens/:uuid")
  @UseGuards(AuthGuard)
  async addKitchen(
    @Param("uuid") uuid: string,
    @Res() response: Response<SubscriptionsKitchenInfo[]>,
    @CurrentUser() { email }: UserInterface
  ): Promise<void> {
    try {
      await this.apiSubscriptionsService.addKitchen(email, uuid);
      const subscriptionList: SubscriptionsKitchenInfo[] =
        await this.apiSubscriptionsService.getAllSubscriptionsKitchens(email);
      response.status(200).send(subscriptionList);
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }
}
