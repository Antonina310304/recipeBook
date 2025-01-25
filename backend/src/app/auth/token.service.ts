import { Injectable } from "@nestjs/common";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { StringValue } from "ms";

import { ConfigService } from "../../common/config/config.service";
import { RefreshTokensRepository } from "../../common/repositories/refresh-tokens/refresh-tokens.repository";
import { RefreshTokensEntity } from "../../common/entities/refresh-tokens.entity";
import { MaxAgeTokensInterface, TokensInterface } from "../api/api-auth/types";

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly refreshTokensRepository: RefreshTokensRepository
  ) {}

  generateTokens(payload: string): TokensInterface {
    const secret: string = this.configService.accessSecret;
    const timeLifeAccessToken: string = `${this.configService.timeLifeAccessToken}Min`;
    const timeLifeRefreshToken: string = `${this.configService.timeLifeRefreshToken}Min`;
    // без as ошибка типизации
    const accessToken: string = sign({ email: payload }, secret, { expiresIn: timeLifeAccessToken as StringValue });
    const refreshToken: string = sign({ email: payload }, secret, { expiresIn: timeLifeRefreshToken as StringValue });
    return {
      accessToken,
      refreshToken
    };
  }

  getMaxAgeTokens(): MaxAgeTokensInterface {
    // минуты * секунды * миллисекунды
    const accessToken: number = this.configService.timeLifeAccessToken * 60 * 1000;
    const refreshToken: number = this.configService.timeLifeRefreshToken * 60 * 1000;

    return {
      refreshToken,
      accessToken
    };
  }

  validateToken(token: string): JwtPayload | string | null {
    const secret: string = this.configService.accessSecret;
    try {
      return verify(token, secret);
    } catch {
      return null;
    }
  }

  async removeRefreshTokenByUserUuid(userUuid: string): Promise<void> {
    await this.refreshTokensRepository.removeByToken(userUuid);
  }

  async saveRefreshToken(userUuid: string, refreshToken: string): Promise<string> {
    const entity: RefreshTokensEntity = await this.refreshTokensRepository.save({ userUuid, token: refreshToken });
    return entity.token;
  }

  async findByDb(refreshToken: string): Promise<RefreshTokensEntity | undefined> {
    return await this.refreshTokensRepository.findByToken(refreshToken);
  }
}
