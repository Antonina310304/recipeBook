import { ZonedDateTime } from "@js-joda/core";
import { Injectable } from "@nestjs/common";

import { fastRandString } from "../../common/helpers/fastRandString";
import { AuthCodeEntity } from "../../common/entities/auth-code.entity";
import { ConfigService } from "../../common/config/config.service";
import { AuthCodeRepository } from "../../common/repositories/auth-code/auth-code.repository";

import { AuthCodeErrorBuilder } from "./auth-code-error-builder";

@Injectable()
export class AuthCodeService {
  constructor(
    private readonly configService: ConfigService,
    private readonly authCodeRepository: AuthCodeRepository
  ) {}

  async generateAuthCode(userEmail: string): Promise<string> {
    const code: string = fastRandString(6);
    await this.authCodeRepository.save({
      code,
      userEmail,
      dateCreate: new Date().toISOString()
    });
    return code;
  }

  async validateAuthCode(userEmail: string, code: string): Promise<void> {
    const entity: AuthCodeEntity | undefined = await this.authCodeRepository.findByCode(code);

    if (!entity) {
      throw AuthCodeErrorBuilder.makeCodeNotFound(code);
    }
    this.checkFreshActiveCode(entity.code, entity.dateCreate);
    await this.authCodeRepository.removeByCondition({
      code,
      userEmail
    });
  }

  private checkFreshActiveCode(code: string, date: Date): void {
    const activeTime: number = this.configService.timeLifeAuthCode;
    const currentDate: ZonedDateTime = ZonedDateTime.now();
    const dateCreateCode: ZonedDateTime = ZonedDateTime.parse(date.toISOString());
    if (currentDate.isAfter(dateCreateCode.plusMinutes(activeTime))) {
      throw AuthCodeErrorBuilder.makeExpiredCode(code);
    }
  }
}
