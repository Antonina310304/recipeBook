import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { Response, Request } from "express";
import { ValidationError } from "class-validator";

import { CommonErrorBuilder } from "../../../common/common-error-builder/common-error-builder";
import { UserInterface } from "../../../common/types";
import { UserGuard } from "../../auth/user.guard";
import { AuthGuard } from "../../auth/auth.guard";
import { CurrentUser } from "../../../common/decorators/current-user.decorator";
import { ErrorDescription } from "../../../common/common-error-builder/types";

import { ApiAuthService } from "./api-auth.service";
import { CommonAuthRequest, ConfirmCodeRequest } from "./types";

@Controller("/auth")
@UsePipes(
  new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]): Error => {
      throw new BadRequestException(
        errors.map(({ constraints }: ValidationError) => Object.values(constraints).join(", ")).join(", ")
      );
    }
  })
)
export class ApiAuthController {
  constructor(private readonly authService: ApiAuthService) {}

  @Post()
  @UseGuards(UserGuard)
  async authUser(
    @Res() response: Response<void | ErrorDescription>,
    @Body() request: CommonAuthRequest
  ): Promise<void> {
    try {
      await this.authService.sendAuthCode(request.email);
      response.status(204).send();
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }

  @Post("logout")
  @UseGuards(AuthGuard)
  async logout(
    @Res() response: Response<void | ErrorDescription>,
    @CurrentUser() { email }: UserInterface
  ): Promise<void> {
    try {
      await this.authService.logout(email);
      response.clearCookie("refreshToken");
      response.clearCookie("accessToken");
      response.status(204).send();
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }

  @Post("refresh")
  async refresh(@Req() request: Request, @Res() response: Response<void | ErrorDescription>): Promise<void> {
    try {
      const refreshToken: string | undefined = request.cookies?.refreshToken as string | undefined;

      if (!refreshToken) {
        throw new UnauthorizedException("Пользователь не авторизован!");
      }

      await this.authService.refresh(refreshToken, response);

      response.status(204).send();
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }

  @Post("/confirm-code")
  @UseGuards(UserGuard)
  async confirmCode(
    @Res() response: Response<void | ErrorDescription>,
    @Body() request: ConfirmCodeRequest
  ): Promise<void> {
    try {
      await this.authService.login(request.email, request.code, response);

      response.status(204).send();
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }
}
