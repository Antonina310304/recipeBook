import { Injectable } from "@nestjs/common";

import { MessageFactory } from "../../message/messageFactory/message.factory";
import { MessageCreator, MessageType } from "../../message/messageFactory/types";
import { EmailService } from "../../message/email.service";
import { AuthCodeService } from "../../auth/auth-code.service";
import { TokenService } from "../../auth/token.service";
import { ConfigService } from "../../../common/config/config.service";
import { UsersRepository } from "../../../common/repositories/users/users.repository";

import { MaxAgeTokensInterface, TokensInterface } from "./types";

@Injectable()
export class ApiAuthService {
  constructor(
    private readonly emailService: EmailService,
    private readonly codeService: AuthCodeService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    private readonly usersRepository: UsersRepository
  ) {}

  async sendAuthCode(userEmail: string): Promise<void> {
    const code: string = await this.codeService.generateAuthCode(userEmail);
    const message: string = this.createMessage(code);

    await this.emailService.send({
      email: userEmail,
      subject: "Код подтверждения для авторизации ",
      message
    });
  }

  async login(userEmail: string, code: string): Promise<TokensInterface> {
    await this.codeService.validateAuthCode(userEmail, code);

    const userUuid: string = (await this.usersRepository.findByEmail(userEmail)).uuid;

    const tokens: TokensInterface = this.tokenService.generateTokens(userEmail);

    await this.tokenService.saveRefreshToken(userUuid, tokens.refreshToken);
    return tokens;
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

  private createMessage(code: string): string {
    const messageFactory: MessageFactory = new MessageFactory();
    const messageCreator: MessageCreator = messageFactory.makeMessageCreator(MessageType.AUTH_CODE);

    return messageCreator.makeMessage({
      [MessageType.AUTH_CODE]: {
        code
      }
    });
  }
}
