import { Injectable, NotFoundException } from "@nestjs/common";

import { UsersEntity } from "../../common/entities/users.entity";
import { UsersRepository } from "../../common/repositories/users/users.repository";
import { SubscriptionsUsersRepository } from "../../common/repositories/subscriptions-users/subscriptions-users.repository";
import { SubscriptionsKitchenRepository } from "../../common/repositories/subscriptions-kitchen/subscriptions-kitchen.repository";
import { KitchensRepository } from "../../common/repositories/kitchens/kitchens.repository";
import { KitchensEntity } from "../../common/entities/kitchen.entity";

import { SubscriptionsKitchenInfo, SubscriptionsUserInfo } from "./types";

@Injectable()
export class ApiSubscriptionsService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly kitchensRepository: KitchensRepository,
    private readonly subscriptionsUsersRepository: SubscriptionsUsersRepository,
    private readonly subscriptionsKitchenRepository: SubscriptionsKitchenRepository
  ) {}

  async addAuthor(userEmail: string, userUud: string): Promise<void> {
    await this.checkUserUud(userUud);
    const user: UsersEntity = await this.usersRepository.findByCondition({ userEmail });

    await this.subscriptionsUsersRepository.save({ userUuid: user.uuid, subscriptionUserUuid: userUud });
  }

  async addKitchen(userEmail: string, kitchenUuid: string): Promise<void> {
    await this.checkKitchenUud(kitchenUuid);
    const user: UsersEntity = await this.usersRepository.findByCondition({ userEmail });

    await this.subscriptionsKitchenRepository.save({ userUuid: user.uuid, kitchenUuid });
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

  async getAllSubscriptionsKitchens(userEmail: string): Promise<SubscriptionsKitchenInfo[]> {
    const user: UsersEntity = await this.usersRepository.findByCondition({ userEmail });
    return await this.subscriptionsKitchenRepository.findByUser(user.uuid);
  }

  private async checkUserUud(uuid: string): Promise<void> {
    const user: UsersEntity = await this.usersRepository.findByCondition({ uuid });

    if (!user) {
      throw new NotFoundException(`Пользователя с таким uuid ${uuid} не существует!`);
    }
  }

  private async checkKitchenUud(uuid: string): Promise<void> {
    const kitchen: KitchensEntity = await this.kitchensRepository.findByUuid(uuid);

    if (!kitchen) {
      throw new NotFoundException(`Кухни с таким uuid ${uuid} не существует!`);
    }
  }
}
