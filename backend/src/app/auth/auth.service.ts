import { Injectable } from "@nestjs/common";
import { Response } from "express";

import { MaxAgeTokensInterface, TokensInterface } from "../api/api-auth/types";

import { TokenService } from "./token.service";

@Injectable()
export class AuthService {
  constructor(private readonly tokenService: TokenService) {}

  async addTokensToResponse(userUuid: string, userEmail: string, response: Response): Promise<void> {
    const tokens: TokensInterface = this.tokenService.generateTokens(userEmail);

    await this.tokenService.saveRefreshToken(userUuid, tokens.refreshToken);

    const maxAgeTokens: MaxAgeTokensInterface = this.tokenService.getMaxAgeTokens();
    response.cookie("refreshToken", tokens.refreshToken, {
      maxAge: maxAgeTokens.refreshToken,
      httpOnly: true
    });

    response.cookie("accessToken", tokens.accessToken, {
      maxAge: maxAgeTokens.accessToken,
      httpOnly: false
    });
  }
}
