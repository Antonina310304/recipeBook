import { Injectable, CanActivate, ExecutionContext, NotFoundException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { UsersEntity } from "../common/entities/users.entity";
import { CommonAuthRequest } from "../api/api-auth/types";
import { UsersRepository } from "../common/repositories/users/users.repository";

@Injectable()
export class UserGuard implements CanActivate {
  private readonly reflector: Reflector;

  private readonly usersRepository: UsersRepository;

  constructor(reflector: Reflector, usersRepository: UsersRepository) {
    this.reflector = reflector;
    this.usersRepository = usersRepository;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: { body: CommonAuthRequest } = context.switchToHttp().getRequest<{ body: CommonAuthRequest }>();

    const { email }: CommonAuthRequest = request.body;

    const userEntity: UsersEntity | null = await this.usersRepository.findByCondition({ userEmail: email });

    if (!userEntity) {
      throw new NotFoundException(`Пользователь с почтой ${email} в системе не зарегистрирован`);
    }
    return true;
  }
}
