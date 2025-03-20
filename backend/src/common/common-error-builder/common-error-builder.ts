import { Response } from "express";
import { HttpException } from "@nestjs/common/exceptions/http.exception";

import { COMMON_ERROR_TEXT } from "./constants";

export class CommonErrorBuilder {
  static makeError(e: Error, response: Response): void {
    console.error(e);
    if (e instanceof HttpException) {
      response.status(e.getStatus()).send(e.getResponse());
      return;
    }
    response.status(500).send({ statusCode: 500, error: "ERROR", message: e.message ?? COMMON_ERROR_TEXT });
  }
}
