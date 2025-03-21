import { Injectable, NotFoundException } from "@nestjs/common";

import { UsersEntity } from "../../common/entities/users.entity";
import { UsersRepository } from "../../common/repositories/users/users.repository";
import { SubscriptionsUsersRepository } from "../../common/repositories/subscriptions-users/subscriptions-users.repository";

import { SubscriptionsUserInfo } from "./types";

@Injectable()
export class ApiSubscriptionsService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly subscriptionsUsersRepository: SubscriptionsUsersRepository
  ) {}

  async addAuthor(userEmail: string, userUud: string): Promise<void> {
    await this.checkUserUud(userUud);
    const user: UsersEntity = await this.usersRepository.findByCondition({ userEmail });

    await this.subscriptionsUsersRepository.save({ userUuid: user.uuid, subscriptionUserUuid: userUud });
  }

  async removeAuthor(userEmail: string, userUud: string): Promise<void> {
    await this.checkUserUud(userUud);
    const user: UsersEntity = await this.usersRepository.findByCondition({ userEmail });

    await this.subscriptionsUsersRepository.remove({ userUuid: user.uuid, subscriptionUserUuid: userUud });
  }

  async getAllUserSubscriptions(userEmail: string): Promise<SubscriptionsUserInfo[]> {
    const user: UsersEntity = await this.usersRepository.findByCondition({ userEmail });
    return await this.subscriptionsUsersRepository.findByUser(user.uuid);
  }

  private async checkUserUud(uuid: string): Promise<void> {
    const user: UsersEntity = await this.usersRepository.findByCondition({ uuid });

    if (!user) {
      throw new NotFoundException(`Пользователя с таким uuid ${uuid} не существует!`);
    }
  }
}
