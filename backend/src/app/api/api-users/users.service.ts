import { ConflictException, Injectable } from "@nestjs/common";

import { UsersRepository } from "../../../common/repositories/users/users.repository";
import { UsersEntity } from "../../../common/entities/users.entity";

import { UserRegistration } from "./types";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async registrationUser(userData: UserRegistration): Promise<UsersEntity> {
    const entity: UsersEntity | null = await this.usersRepository.findByCondition({ userEmail: userData.email });

    if (entity) {
      throw new ConflictException(`Пользователь с почтой ${userData.email} уже существует.`);
    }

    // возвращает не полный UsersEntity
    await this.usersRepository.save({
      nickname: userData.nickname,
      userEmail: userData.email,
      userName: userData.userName
    });

    return this.usersRepository.findByCondition({ userEmail: userData.email });
  }

  async getUserInfo(userEmail: string): Promise<UsersEntity> {
    return this.usersRepository.findByCondition({ userEmail });
  }
}
