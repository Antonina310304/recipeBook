import { BadRequestException, Body, Controller, Post, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Response } from "express";
import { ValidationError } from "class-validator";

import { CommonErrorBuilder } from "../../../common/common-error-builder/common-error-builder";
import { BaseErrorInterface } from "../../../common/types";
import { UserGuard } from "../../auth/user.guard";

import { ApiAuthService } from "./api-auth.service";
import { CommonAuthRequest, ConfirmCodeRequest, MaxAgeTokensInterface, TokensInterface } from "./types";

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
    @Res() response: Response<void | BaseErrorInterface>,
    @Body() request: CommonAuthRequest
  ): Promise<void> {
    try {
      await this.authService.sendAuthCode(request.email);
      response.status(204).send();
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }

  @Post("/confirm-code")
  @UseGuards(UserGuard)
  async confirmCode(
    @Res() response: Response<void | BaseErrorInterface>,
    @Body() request: ConfirmCodeRequest
  ): Promise<void> {
    try {
      const tokens: TokensInterface = await this.authService.login(request.email, request.code);
      const maxAgeTokens: MaxAgeTokensInterface = this.authService.getMaxAgeTokens();
      response.cookie("refreshToken", tokens.refreshToken, {
        maxAge: maxAgeTokens.refreshToken,
        httpOnly: true
      });
      response.cookie("accessToken", tokens.accessToken, {
        maxAge: maxAgeTokens.accessToken,
        httpOnly: false
      });
      response.status(204).send();
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }
}
