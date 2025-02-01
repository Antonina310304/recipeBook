import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";

import { PortalMessageRepository } from "../../common/repositories/portal-message/portal-message.repository";
import { RecipeEventsRepository } from "../../common/repositories/recipe-events/recipe-events.repository";
import {
  CommonRecipeListForMailing,
  DataForMailingFoKitchens,
  RecipeSubscriberByEventsInterface
} from "../../common/repositories/recipe-events/types";
import { PortalMessageEntity } from "../../common/entities/portal-message.entity";

import { ConfirmRecipeEventsInterface } from "./types";

@Injectable()
export class NotificationMessageService {
  constructor() {}

  async getNotificationInfoForPortal(entityManager: EntityManager): Promise<RecipeSubscriberByEventsInterface[]> {
    const recipeEventsRepository: RecipeEventsRepository = new RecipeEventsRepository(entityManager);
    return await recipeEventsRepository.getRecipeSubscriberByEvents();
  }

  async savePortalMessage(events: PortalMessageEntity[], entityManager: EntityManager): Promise<void> {
    const portalMessageRepository: PortalMessageRepository = new PortalMessageRepository(entityManager);
    await portalMessageRepository.save(events);
  }

  async getRecipeListForMailingByKitchens(entityManager: EntityManager): Promise<DataForMailingFoKitchens[]> {
    const recipeEventsRepository: RecipeEventsRepository = new RecipeEventsRepository(entityManager);
    return await recipeEventsRepository.getDataForMailingByKitchens();
  }

  async getRecipeListForMailingByAuthor(entityManager: EntityManager): Promise<CommonRecipeListForMailing[]> {
    const recipeEventsRepository: RecipeEventsRepository = new RecipeEventsRepository(entityManager);
    return await recipeEventsRepository.getDataForMailingByAuthor();
  }

  async confirmRecipeEvents(events: ConfirmRecipeEventsInterface[], entityManager: EntityManager): Promise<void> {
    const recipeEventsRepository: RecipeEventsRepository = new RecipeEventsRepository(entityManager);

    await recipeEventsRepository.save(events, {
      reload: true
    });
  }
}
