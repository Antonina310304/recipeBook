import {
  CommonRecipeListForMailing,
  RecipeSubscriberByEventsInterface
} from "../../common/repositories/recipe-events/types";
import { PortalMessageEntity } from "../../common/entities/portal-message.entity";

import { ConfirmRecipeEventsInterface } from "./types";

export class NotificationMessageMapper {
  static mapToRecipeEventsFromPortalMessage(
    source: RecipeSubscriberByEventsInterface[],
    destination: ConfirmRecipeEventsInterface[]
  ): void {
    source.forEach((recipe) => {
      destination.push({
        parsedPortal: true,
        uuid: recipe.eventUuid,
        recipeUuid: recipe.recipeUuid
      });
    });
  }

  static mapToRecipeEventsFromEmailMessage(
    source: CommonRecipeListForMailing[],
    destination: ConfirmRecipeEventsInterface[]
  ): void {
    source.forEach((recipe) => {
      destination.push({
        parsedEmail: true,
        uuid: recipe.eventUuid,
        recipeUuid: recipe.recipeUuid
      });
    });
  }

  static mapToRecipeEventsForPortalMessage(
    source: RecipeSubscriberByEventsInterface[],
    destination: PortalMessageEntity[]
  ): void {
    source.forEach((recipe) => {
      destination.push({
        userUuid: recipe.userUuid,
        recipeUuid: recipe.recipeUuid,
        parsed: false
      });
    });
  }
}
