import { ConflictException } from "@nestjs/common";
import { HttpException } from "@nestjs/common/exceptions/http.exception";

export class AuthCodeErrorBuilder {
  static makeCodeNotFound(code: string): HttpException {
    return new ConflictException(`Неверный код подтверждения ${code}`);
  }

  static makeExpiredCode(code: string): HttpException {
    return new ConflictException(`Просроченный код подтверждения ${code}`);
  }
}
