import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { Response } from "express";
import { ValidationError } from "class-validator";

import { CommonErrorBuilder } from "../../../common/common-error-builder/common-error-builder";
import { UsersRepository } from "../../../common/repositories/users/users.repository";
import { ErrorDescription } from "../../../common/common-error-builder/types";
import { UsersEntity } from "../../../common/entities/users.entity";
import { AuthService } from "../../auth/auth.service";
import { AuthGuard } from "../../auth/auth.guard";
import { CurrentUser } from "../../../common/decorators/current-user.decorator";
import { UserInterface } from "../../../common/types";

import { PublicUserInterface, UserRegistration } from "./types";
import { UsersService } from "./users.service";

@UsePipes(
  new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]): Error => {
      throw new BadRequestException(
        errors.map(({ constraints }: ValidationError) => Object.values(constraints).join(", ")).join(", ")
      );
    }
  })
)
@Controller()
export class ApiUsersController {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Get("/users")
  async getUsers(@Res() response: Response<PublicUserInterface[] | ErrorDescription>): Promise<void> {
    try {
      const res: PublicUserInterface[] = await this.usersRepository.getPublicUsersInfo();
      response.status(200).send(res);
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }

  @Post("/user/registration")
  async registrationUsers(
    @Res() response: Response<UsersEntity | ErrorDescription>,
    @Body() body: UserRegistration
  ): Promise<void> {
    try {
      const res: UsersEntity = await this.usersService.registrationUser(body);
      await this.authService.addTokensToResponse(res.uuid, res.userEmail, response);
      response.status(200).send(res);
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }

  @Get("/user")
  @UseGuards(AuthGuard)
  async getUserInfo(
    @Res() response: Response<UsersEntity | ErrorDescription>,
    @CurrentUser() { email }: UserInterface
  ): Promise<void> {
    try {
      const res: UsersEntity = await this.usersService.getUserInfo(email);
      response.status(200).send(res);
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }
}
