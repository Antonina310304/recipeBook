import { Controller, Get, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";

import { CommonErrorBuilder } from "../../../common/common-error-builder/common-error-builder";
import { UsersRepository } from "../../../common/repositories/users/users.repository";
import { AuthGuard } from "../../auth/auth.guard";
import { ErrorDescription } from "../../../common/common-error-builder/types";

import { PublicUserInterface } from "./types";

@Controller()
export class ApiUsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Get("/users")
  async getUsers(@Res() response: Response<PublicUserInterface[] | ErrorDescription>): Promise<void> {
    try {
      const res: PublicUserInterface[] = await this.usersRepository.getPublicUsersInfo();
      response.status(200).send(res);
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }

  @Get("/users2")
  @UseGuards(AuthGuard)
  async getUsersv2(@Res() response: Response<PublicUserInterface[] | ErrorDescription>): Promise<void> {
    try {
      const res: PublicUserInterface[] = await this.usersRepository.getPublicUsersInfo();
      response.status(200).send(res);
    } catch (e) {
      CommonErrorBuilder.makeError(e as Error, response);
    }
  }
}
