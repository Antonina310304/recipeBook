import { Response } from "express";

import { COMMON_ERROR_TEXT } from "./constants";

export class CommonErrorBuilder {
  static makeError(e: Error, response: Response): void {
    console.error(e);
    response.status(500).send({ status: "ERROR", errorText: e.message ?? COMMON_ERROR_TEXT });
  }
}
