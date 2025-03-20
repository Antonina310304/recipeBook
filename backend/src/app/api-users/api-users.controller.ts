import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";

import { CommonErrorBuilder } from "../../common/common-error-builder/common-error-builder";
import { BaseErrorInterface } from "../../common/types";
import { UsersRepository } from "../../common/repositories/users/users.repository";

import { PublicUserInterface } from "./types";

@Controller()
export class ApiUsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Get("/users")
  async getUsers(@Res() response: Response<PublicUserInterface[] | BaseErrorInterface>): Promise<void> {
    try {
      const res: PublicUserInterface[] = await this.usersRepository.getPublicUsersInfo();
      response.status(200).send(res);
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }
}
