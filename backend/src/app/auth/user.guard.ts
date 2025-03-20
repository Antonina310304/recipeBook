import { Injectable, CanActivate, ExecutionContext, NotFoundException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { UsersEntity } from "../../common/entities/users.entity";
import { UsersRepository } from "../../common/repositories/users/users.repository";
import { AuthRequestDto } from "../api/api-auth/dto/request.dto";

@Injectable()
export class UserGuard implements CanActivate {
  private readonly reflector: Reflector;

  private readonly usersRepository: UsersRepository;

  constructor(reflector: Reflector, usersRepository: UsersRepository) {
    this.reflector = reflector;
    this.usersRepository = usersRepository;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: { body: AuthRequestDto } = context.switchToHttp().getRequest<{ body: AuthRequestDto }>();

    const { email }: AuthRequestDto = request.body;

    const userEntity: UsersEntity | null = await this.usersRepository.findByCondition({ userEmail: email });

    if (!userEntity) {
      throw new NotFoundException(`User not found`);
    }
    return true;
  }
}
